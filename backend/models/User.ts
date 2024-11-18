import mongoose from 'mongoose';

    const userSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      progress: [{ lessonId: mongoose.Schema.Types.ObjectId, completed: Boolean }],
      badges: [String],
    });

    export default mongoose.model('User', userSchema);
