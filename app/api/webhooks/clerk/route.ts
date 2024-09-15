import { clerkClient } from "@clerk/nextjs/server"; 
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createOrUpdateUser, deleteUser } from "@/lib/actions/user.action"; 

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;

  // Ensure `id` is defined before proceeding
  const id = evt.data?.id;
  if (!id) {
    console.error("User ID is undefined");
    return new Response("Error: User ID is undefined", { status: 400 });
  }

  if (eventType === "user.created") {
    const { email_addresses } = evt.data;

    if (email_addresses && email_addresses.length > 0) {
      // Map EmailAddressJSON to EmailAddress
      const mappedEmailAddresses = email_addresses.map((emailObj: any) => ({
        email: emailObj.email_address,
      }));

      console.log({ id, mappedEmailAddresses });

      try {
        // Pass the mapped array
        const newUser = await createOrUpdateUser(id, mappedEmailAddresses); 

        if (newUser) {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userId: newUser._id,
            },
          });
        }

        return NextResponse.json({ message: "New user created", user: newUser });
      } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    } else {
      console.error("No email addresses provided for user:", id);
      return new Response("Error: No email addresses provided", { status: 400 });
    }
  }

  if (eventType === 'user.deleted') {
    try {
      await deleteUser(id);
      return new Response('User is deleted', {
        status: 200,
      });
    } catch (error) {
      console.log('Error deleting user:', error);
      return new Response('Error occurred', {
        status: 400,
      });
    }
  }

  console.log(`Webhook with ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
