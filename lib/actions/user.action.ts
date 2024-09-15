import User from '../modals/user.modal';
import { connect } from '../mongodb/mongoose';

// Define the structure of the email addresses
interface EmailAddress {
  email: string;
}

export const createOrUpdateUser = async (
  id: string,
  email_addresses: EmailAddress[]
) => {
  try {
    await connect();

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          email: email_addresses[0].email,
        },
      },
      { new: true, upsert: true }
    );

    console.log(user)

    return user;
  } catch (error) {
    console.log('Error creating or updating user:', error);
  }
};

