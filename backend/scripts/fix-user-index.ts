import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function fixUserIndex() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Drop the username index
    const result = await mongoose.connection.db.collection('users').dropIndex('username_1');
    console.log('Successfully dropped username index:', result);

    // Create unique index on email if it doesn't exist
    await mongoose.connection.db.collection('users').createIndex({ email: 1 }, { unique: true });
    console.log('Successfully ensured unique email index');

  } catch (error: any) {
    if (error.code === 27 && error.message.includes('index not found')) {
      console.log('Username index already removed');
    } else {
      console.error('Error:', error);
    }
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

fixUserIndex();
