import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { createOrUpdateUser } from '@/lib/actions/user.action';

// Define a type for the webhook event data
interface WebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses: { email: string }[];
  };
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent; // Cast the verification result to the WebhookEvent type
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  // Handle user.created event
  const eventType = evt?.type;
  console.log(`Webhook type: ${eventType}`);

  if (eventType === 'user.created') {
    const { id, email_addresses } = evt.data;
    try {
      await createOrUpdateUser(id, email_addresses);
      return new Response('User is created', {
        status: 200,
      });
    } catch (error) {
      console.log('Error creating user:', error);
      return new Response('Error occurred', {
        status: 400,
      });
    }
  }

  return new Response('', { status: 200 });
}
