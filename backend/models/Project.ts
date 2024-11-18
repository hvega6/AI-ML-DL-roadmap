import mongoose from 'mongoose';

    const projectSchema = new mongoose.Schema({
      title: { type: String, required: true },
      description: { type: String, required: true },
      submissionLink: String,
      grade: Number,
      feedback: String,
      submittedBy: mongoose.Schema.Types.ObjectId,
      deadline: Date,
    });

    export default mongoose.model('Project', projectSchema);
