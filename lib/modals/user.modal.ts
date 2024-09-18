import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

//console.log(User)

export default User;
