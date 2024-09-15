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

    // Check if the user exists first
    let user = await User.findOne({ clerkId: id });

    if (user) {
      // If user exists, update their information
      user = await User.findOneAndUpdate(
        { clerkId: id },
        {
          $set: {
            email: email_addresses[0].email,
          },
        },
        { new: true }
      );
    } else {
      // If user doesn't exist, create a new user
      user = new User({
        clerkId: id,
        email: email_addresses[0].email,
      });

      await user.save(); // Save the new user to the database
    }

    console.log(user);
    return user;

  } catch (error) {
    console.log('Error creating or updating user:', error);
  }
};
