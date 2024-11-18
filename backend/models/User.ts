import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  googleId?: string;
  displayName?: string;
  avatar?: string;
  progress: Array<{ lessonId: mongoose.Types.ObjectId; completed: boolean }>;
  badges: string[];
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  displayName: { type: String },
  avatar: { type: String },
  progress: [{ 
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }, 
    completed: Boolean 
  }],
  badges: [String],
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
