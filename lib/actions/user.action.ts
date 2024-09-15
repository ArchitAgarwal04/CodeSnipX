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
          email: email_addresses[0]?.email, // Using optional chaining to prevent errors
        },
      },
      { new: true, upsert: true }
    );

    console.log(user)

    return user;
  } catch (error) {
    console.error('Error creating or updating user:', error); // Use console.error for error logging
    throw new Error('Failed to create or update user'); // Throw error for better error handling
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connect();

    const result = await User.findOneAndDelete({ clerkId: id });

    if (!result) {
      console.warn(`No user found with clerkId: ${id}`); // Warning if user not found
    }
  } catch (error) {
    console.error('Error deleting user:', error); // Use console.error for error logging
    throw new Error('Failed to delete user'); // Throw error for better error handling
  }
};
