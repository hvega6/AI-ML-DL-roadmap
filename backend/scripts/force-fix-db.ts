import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function forceFixDatabase() {
  let client;
  try {
    // Connect directly using MongoClient
    client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    console.log('Connected to MongoDB');

    // Get database name from connection string
    const dbName = process.env.DATABASE_NAME || 'ai_roadmap';
    const db = client.db(dbName);
    
    // Drop the users collection entirely and recreate it
    try {
      await db.collection('users').drop();
      console.log('Dropped users collection');
    } catch (err) {
      console.log('Users collection might not exist, continuing...');
    }

    // Create users collection with proper schema validation
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'password', 'role'],
          properties: {
            email: {
              bsonType: 'string',
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
            },
            password: {
              bsonType: 'string'
            },
            role: {
              enum: ['student', 'admin']
            },
            preferences: {
              bsonType: 'object',
              properties: {
                theme: {
                  enum: ['light', 'dark']
                }
              }
            },
            progress: {
              bsonType: 'object',
              properties: {
                completedLessons: {
                  bsonType: 'array'
                },
                currentLesson: {
                  bsonType: ['null', 'objectId']
                },
                quizScores: {
                  bsonType: 'array'
                }
              }
            }
          }
        }
      }
    });
    console.log('Created users collection with schema validation');

    // Create the email index
    await db.collection('users').createIndex(
      { email: 1 },
      { 
        unique: true,
        background: true,
        name: 'email_unique'
      }
    );
    console.log('Created unique email index');

    // Verify indexes
    const indexes = await db.collection('users').indexes();
    console.log('Current indexes:', indexes);

    console.log('Database fix completed successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('Disconnected from MongoDB');
    }
  }
}

forceFixDatabase().catch(console.error);
