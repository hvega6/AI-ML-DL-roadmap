import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  googleId?: string;
  displayName?: string;
  avatar?: string;
  role: 'student' | 'admin';
  profile: {
    firstName?: string;
    lastName?: string;
    bio?: string;
    location?: string;
    socialLinks?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
  progress: {
    courseId: mongoose.Types.ObjectId;
    completedLessons: mongoose.Types.ObjectId[];
    lastAccessed: Date;
    progress: number;
  }[];
  preferences: {
    notifications: boolean;
    language: string;
    theme: 'light' | 'dark';
  };
  achievements: {
    type: string;
    title: string;
    description: string;
    earnedDate: Date;
  }[];
  stats: {
    totalTimeSpent: number;
    coursesCompleted: number;
    lessonsCompleted: number;
    averageQuizScore: number;
    streakDays: number;
    lastActive: Date;
  };
  badges: string[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String,
    minlength: 6
  },
  googleId: { 
    type: String,
    sparse: true,
    unique: true
  },
  displayName: { 
    type: String,
    trim: true
  },
  avatar: { 
    type: String 
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  profile: {
    firstName: String,
    lastName: String,
    bio: String,
    location: String,
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String
    }
  },
  progress: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    lastAccessed: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 }
  }],
  preferences: {
    notifications: { type: Boolean, default: true },
    language: { type: String, default: 'en' },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' }
  },
  achievements: [{
    type: String,
    title: String,
    description: String,
    earnedDate: { type: Date, default: Date.now }
  }],
  stats: {
    totalTimeSpent: { type: Number, default: 0 },
    coursesCompleted: { type: Number, default: 0 },
    lessonsCompleted: { type: Number, default: 0 },
    averageQuizScore: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }
  },
  badges: [String]
}, {
  timestamps: true
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
