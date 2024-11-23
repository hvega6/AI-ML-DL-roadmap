import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function cleanupTestDatabase() {
  let client;
  try {
    const mongoUri = process.env.MONGODB_URI!;
    
    // Connect directly using MongoClient
    client = new MongoClient(mongoUri);
    await client.connect();
    console.log('Connected to MongoDB');

    // Switch to test database
    const testDb = client.db('test');
    console.log('Switched to test database');

    // Drop the users collection in test database
    try {
      await testDb.collection('users').drop();
      console.log('Dropped users collection from test database');
    } catch (err) {
      console.log('Users collection might not exist in test database');
    }

    // Drop the entire test database
    try {
      await testDb.dropDatabase();
      console.log('Dropped test database');
    } catch (err) {
      console.log('Could not drop test database:', err);
    }

    console.log('Cleanup completed successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('Disconnected from MongoDB');
    }
  }
}

cleanupTestDatabase().catch(console.error);
