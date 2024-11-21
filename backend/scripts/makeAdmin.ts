import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Connected to MongoDB');

    const email = 'hugo17avid@gmail.com';
    
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { role: 'admin' } },
      { new: true }
    );

    if (!user) {
      console.log('User not found');
      return;
    }

    console.log('User updated successfully:', user);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

makeAdmin();
