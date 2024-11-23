import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function verifyDatabase() {
  let client;
  try {
    const dbName = process.env.DATABASE_NAME || 'ai_roadmap';
    const mongoUri = process.env.MONGODB_URI!;
    
    // Connect directly using MongoClient
    client = new MongoClient(mongoUri);
    await client.connect();
    console.log('Connected to MongoDB');

    // List all databases
    const adminDb = client.db('admin');
    const dbs = await adminDb.admin().listDatabases();
    console.log('\nAvailable databases:');
    dbs.databases.forEach(db => console.log(`- ${db.name}`));

    // Switch to our database
    const db = client.db(dbName);
    console.log(`\nSwitched to database: ${dbName}`);

    // List all collections in our database
    const collections = await db.listCollections().toArray();
    console.log('\nCollections in database:');
    collections.forEach(col => console.log(`- ${col.name}`));

    // Check indexes on users collection
    if (collections.some(col => col.name === 'users')) {
      console.log('\nIndexes on users collection:');
      const indexes = await db.collection('users').indexes();
      console.log(JSON.stringify(indexes, null, 2));

      // Drop problematic username index if it exists
      const usernameIndex = indexes.find(idx => idx.key.username === 1);
      if (usernameIndex) {
        console.log('\nDropping username index...');
        await db.collection('users').dropIndex('username_1');
        console.log('Username index dropped successfully');
      }
    }

    console.log('\nDatabase verification completed');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('\nDisconnected from MongoDB');
    }
  }
}

verifyDatabase().catch(console.error);
