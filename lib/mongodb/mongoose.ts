import mongoose from 'mongoose';

let initialized = false;

export const connect = async () => {
  mongoose.set('strictQuery', true);

  if (initialized) {
    console.log('MongoDB already connected');
    return;
  }

  const mongoUrl = process.env.MONGO_URL;

  // Check if MONGO_URL is undefined
  if (!mongoUrl) {
    throw new Error('MONGO_URL is not defined in the environment variables');
  }

  try {
    await mongoose.connect(mongoUrl, {
      dbName: 'codesnipx3', // Ensure this matches your expected DB name
    });
    console.log('MongoDB connected');
    initialized = true;
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
};
