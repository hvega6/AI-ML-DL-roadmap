import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  googleId?: string;
  displayName?: string;
  avatar?: string;
  progress: Array<{
    lessonId: mongoose.Types.ObjectId;
    completed: boolean;
  }>;
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
  progress: [{ 
    lessonId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Lesson',
      required: true
    }, 
    completed: {
      type: Boolean,
      default: false
    }
  }],
  badges: [{
    type: String
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
