import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function fixDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');

    // Step 1: Drop all indexes except _id
    console.log('Dropping all indexes...');
    const indexes = await usersCollection.indexes();
    for (const index of indexes) {
      if (index.name !== '_id_') {
        await usersCollection.dropIndex(index.name);
        console.log(`Dropped index: ${index.name}`);
      }
    }

    // Step 2: Clean up any documents with null username
    console.log('Cleaning up documents...');
    const updateResult = await usersCollection.updateMany(
      { username: null },
      { $unset: { username: "" } }
    );
    console.log(`Updated ${updateResult.modifiedCount} documents`);

    // Step 3: Create necessary indexes
    console.log('Creating new indexes...');
    await usersCollection.createIndex(
      { email: 1 },
      { unique: true, sparse: true }
    );
    console.log('Created unique index on email');

    console.log('Database fix completed successfully');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

fixDatabase().catch(console.error);
