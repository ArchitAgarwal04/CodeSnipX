import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { createUser } from "@/lib/actions/user.action";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  const CLERK_API_KEY = process.env.CLERK_API_KEY;

  if (!WEBHOOK_SECRET || !CLERK_API_KEY) {
    throw new Error(
      "Please add WEBHOOK_SECRET and CLERK_API_KEY from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  // CREATE User in mongodb
  if (eventType === "user.created") {
    const { id, email_addresses } = evt.data;

    const user = {
      clerkUserId: id,
      emailAddress: email_addresses[0].email_address,
    };

    console.log(user);

    const newUser = await createUser(user);

    if (newUser) {
      // Use Clerk's REST API to update user metadata
      const clerkUserUpdateUrl = `https://api.clerk.dev/v1/users/${id}`;

      const response = await fetch(clerkUserUpdateUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${CLERK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_metadata: {
            userId: newUser._id,
          },
        }),
      });

      if (!response.ok) {
        console.error("Failed to update Clerk user metadata");
        return new Response("Failed to update Clerk user metadata", {
          status: 500,
        });
      }
    }

    return NextResponse.json({ message: "New user created", user: newUser });
  }

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
