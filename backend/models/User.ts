import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'student' | 'admin';
  preferences: {
    theme: 'light' | 'dark';
  };
  progress: {
    completedLessons: string[];
    currentLesson: string | null;
    quizScores: Array<{
      quizId: string;
      score: number;
      dateTaken: Date;
    }>;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    validate: {
      validator: function(v: string) {
        // At least 6 chars, 1 uppercase, 1 lowercase, 1 number
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(v);
      },
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }
  },
  role: { 
    type: String, 
    enum: ['student', 'admin'],
    default: 'student'
  },
  preferences: {
    theme: { 
      type: String, 
      enum: ['light', 'dark'],
      default: 'light'
    }
  },
  progress: {
    completedLessons: [{ type: String }],
    currentLesson: { type: String, default: null },
    quizScores: [{
      quizId: { type: String },
      score: { type: Number },
      dateTaken: { type: Date, default: Date.now }
    }]
  }
}, {
  timestamps: true
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    if (!this.password) {
      throw new Error('Password not set for user');
    }
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    console.error('Password comparison error:', error);
    throw new Error('Error comparing passwords');
  }
};

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.error('Password hashing error:', error);
    next(error as Error);
  }
});

export const User = mongoose.model<IUser>('User', userSchema);
