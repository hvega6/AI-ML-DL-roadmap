import mongoose from 'mongoose';

    const capstoneSchema = new mongoose.Schema({
      title: { type: String, required: true },
      description: { type: String, required: true },
      teamMembers: [{ userId: mongoose.Schema.Types.ObjectId }],
      sharedFiles: [String],
      discussions: [{ user: mongoose.Schema.Types.ObjectId, message: String, date: Date }],
    });

    export default mongoose.model('Capstone', capstoneSchema);
