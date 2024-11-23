import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'student' | 'admin';
  preferences: {
    theme: 'light' | 'dark';
  };
  progress: {
    completedLessons: Types.ObjectId[];
    currentLesson: Types.ObjectId | null;
    quizScores: Array<{
      quizId: Types.ObjectId;
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
    minlength: [8, 'Password must be at least 8 characters long'],
    select: true,
    validate: {
      validator: function(v: string) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
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
    completedLessons: [{
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    }],
    currentLesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
      default: null
    },
    quizScores: [{
      quizId: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
      },
      score: Number,
      dateTaken: {
        type: Date,
        default: Date.now
      }
    }]
  }
}, {
  timestamps: true
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

export const User = mongoose.model<IUser>('User', userSchema);
