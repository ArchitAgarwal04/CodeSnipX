import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'; 
import { createOrUpdateUser, deleteUser } from '@/lib/actions/user.action';

interface WebhookEvent {
  data: {
    id: string;
    email_addresses?: string[]; // Assuming string[] for email addresses
  };
  type: string;
}

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occurred', { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { email_addresses } = evt.data;

    // Check if email_addresses is not undefined and has length
    if (email_addresses && email_addresses.length > 0) {
      // Map the string[] to EmailAddress[] if needed
      const formattedEmails = email_addresses.map(email => ({ email })); // Convert to EmailAddress[] if it's an object
      try {
        await createOrUpdateUser(id, formattedEmails); 
        return new NextResponse('User is created or updated', { status: 200 });
      } catch (error) {
        console.log('Error creating or updating user:', error);
        return new NextResponse('Error occurred', { status: 400 });
      }
    } else {
      console.error('No email addresses provided for user:', id);
      return new NextResponse('Error: No email addresses provided', { status: 400 });
    }
  }

  if (eventType === 'user.deleted') {
    try {
      await deleteUser(id);
      return new NextResponse('User is deleted', { status: 200 });
    } catch (error) {
      console.log('Error deleting user:', error);
      return new NextResponse('Error occurred', { status: 400 });
    }
  }

  return new NextResponse('', { status: 200 });
}
