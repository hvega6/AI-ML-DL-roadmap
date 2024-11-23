import mongoose from 'mongoose';
import { User } from '../models/User';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function createTestUser() {
  try {
    // Connect to MongoDB
    const dbName = process.env.DATABASE_NAME || 'ai_roadmap';
    const mongoUri = process.env.MONGODB_URI!;
    
    await mongoose.connect(mongoUri, {
      dbName: dbName
    } as mongoose.ConnectOptions);
    console.log('Connected to MongoDB');

    // Delete existing test user if exists
    const email = 'test2@example.us';
    await User.deleteOne({ email });
    console.log('Deleted existing test user if any');

    // Create password hash
    const password = 'TestPass123!';
    console.log('Test password:', password);
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Generated hash:', hashedPassword);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      role: 'student',
      progress: {
        completedLessons: [],
        currentLesson: null,
        quizScores: []
      },
      preferences: {
        theme: 'light'
      }
    });

    await user.save();
    console.log('User created successfully');

    // Verify password
    const savedUser = await User.findOne({ email });
    if (savedUser) {
      console.log('\nVerifying password...');
      const isMatch = await bcrypt.compare(password, savedUser.password);
      console.log('Password verification result:', isMatch);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createTestUser().catch(console.error);
