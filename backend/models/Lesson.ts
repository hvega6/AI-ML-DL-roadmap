import mongoose, { Document, Schema } from 'mongoose';

export interface ILesson extends Document {
  title: string;
  description: string;
  courseId: mongoose.Types.ObjectId;
  order: number;
  content: {
    type: 'text' | 'video' | 'code' | 'quiz';
    data: string;
    duration?: number;
  }[];
  resources: {
    title: string;
    url: string;
    type: 'pdf' | 'github' | 'external';
    description?: string;
  }[];
  quiz?: {
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
      points: number;
    }[];
    passingScore: number;
    timeLimit?: number;
  };
  prerequisites: mongoose.Types.ObjectId[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  estimatedTime: number;
  status: 'draft' | 'published';
  completedBy: {
    userId: mongoose.Types.ObjectId;
    completed: boolean;
    quizScore?: number;
    timeSpent: number;
    lastAccessed: Date;
  }[];
}

const lessonSchema = new Schema<ILesson>({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: {
    type: String,
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  content: [{
    type: {
      type: String,
      enum: ['text', 'video', 'code', 'quiz'],
      required: true
    },
    data: {
      type: String,
      required: true
    },
    duration: Number
  }],
  resources: [{
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['pdf', 'github', 'external'],
      required: true
    },
    description: String
  }],
  quiz: {
    questions: [{
      question: {
        type: String,
        required: true
      },
      options: [{
        type: String,
        required: true
      }],
      correctAnswer: {
        type: Number,
        required: true
      },
      explanation: String,
      points: {
        type: Number,
        default: 1
      }
    }],
    passingScore: {
      type: Number,
      required: true
    },
    timeLimit: Number
  },
  prerequisites: [{
    type: Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  tags: [String],
  estimatedTime: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  completedBy: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    quizScore: Number,
    timeSpent: {
      type: Number,
      default: 0
    },
    lastAccessed: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
lessonSchema.index({ courseId: 1, order: 1 });
lessonSchema.index({ tags: 1 });
lessonSchema.index({ status: 1 });

export default mongoose.model<ILesson>('Lesson', lessonSchema);
