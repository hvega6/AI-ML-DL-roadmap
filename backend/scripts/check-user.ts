import mongoose from 'mongoose';
import { User } from '../models/User';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function checkUser() {
  try {
    // Connect to MongoDB
    const dbName = process.env.DATABASE_NAME || 'ai_roadmap';
    const mongoUri = process.env.MONGODB_URI!;
    
    await mongoose.connect(mongoUri, {
      dbName: dbName
    } as mongoose.ConnectOptions);
    console.log('Connected to MongoDB');

    // Find user
    const email = 'test@example.us';
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found');
      return;
    }

    console.log('User found:', {
      email: user.email,
      role: user.role,
      passwordHash: user.password
    });

    // Test password comparison
    const testPassword = 'Kr22YjDc495fuEU!';
    console.log('\nTesting password comparison...');
    console.log('Test password:', testPassword);
    
    // Manual bcrypt compare
    const isMatch = await bcrypt.compare(testPassword, user.password);
    console.log('Direct bcrypt comparison result:', isMatch);

    // Test with a new hash
    console.log('\nGenerating new hash for comparison...');
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(testPassword, salt);
    console.log('New hash:', newHash);
    console.log('Stored hash:', user.password);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

checkUser().catch(console.error);
