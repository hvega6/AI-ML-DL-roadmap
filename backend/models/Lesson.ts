import mongoose from 'mongoose';

    const lessonSchema = new mongoose.Schema({
      title: { type: String, required: true },
      content: { type: String, required: true },
      quiz: [{ question: String, options: [String], answer: String }],
      completedBy: [{ userId: mongoose.Schema.Types.ObjectId, date: Date }],
    });

    export default mongoose.model('Lesson', lessonSchema);
