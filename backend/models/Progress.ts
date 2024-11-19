import mongoose, { Document, Schema } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  startDate: Date;
  lastAccessed: Date;
  overallProgress: number;
  currentLesson: mongoose.Types.ObjectId;
  lessonsProgress: {
    lessonId: mongoose.Types.ObjectId;
    status: 'not_started' | 'in_progress' | 'completed';
    timeSpent: number;
    lastAccessed: Date;
    attempts: {
      date: Date;
      quizScore?: number;
      completed: boolean;
      timeSpent: number;
    }[];
    notes?: string;
    bookmarks?: {
      timestamp: number;
      note: string;
    }[];
  }[];
  quizScores: {
    lessonId: mongoose.Types.ObjectId;
    score: number;
    maxScore: number;
    attempts: number;
    lastAttempt: Date;
  }[];
  assignments: {
    lessonId: mongoose.Types.ObjectId;
    status: 'pending' | 'submitted' | 'graded';
    submissionUrl?: string;
    grade?: number;
    feedback?: string;
    submissionDate?: Date;
  }[];
  certificate?: {
    issued: boolean;
    issueDate?: Date;
    certificateUrl?: string;
    grade?: string;
  };
  analytics: {
    totalTimeSpent: number;
    averageQuizScore: number;
    completionRate: number;
    lastStreak: number;
    longestStreak: number;
    activeDays: Date[];
  };
}

const progressSchema = new Schema<IProgress>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  overallProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  currentLesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson'
  },
  lessonsProgress: [{
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true
    },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started'
    },
    timeSpent: {
      type: Number,
      default: 0
    },
    lastAccessed: {
      type: Date,
      default: Date.now
    },
    attempts: [{
      date: {
        type: Date,
        default: Date.now
      },
      quizScore: Number,
      completed: {
        type: Boolean,
        default: false
      },
      timeSpent: {
        type: Number,
        default: 0
      }
    }],
    notes: String,
    bookmarks: [{
      timestamp: Number,
      note: String
    }]
  }],
  quizScores: [{
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    score: {
      type: Number,
      required: true
    },
    maxScore: {
      type: Number,
      required: true
    },
    attempts: {
      type: Number,
      default: 1
    },
    lastAttempt: {
      type: Date,
      default: Date.now
    }
  }],
  assignments: [{
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    status: {
      type: String,
      enum: ['pending', 'submitted', 'graded'],
      default: 'pending'
    },
    submissionUrl: String,
    grade: Number,
    feedback: String,
    submissionDate: Date
  }],
  certificate: {
    issued: {
      type: Boolean,
      default: false
    },
    issueDate: Date,
    certificateUrl: String,
    grade: String
  },
  analytics: {
    totalTimeSpent: {
      type: Number,
      default: 0
    },
    averageQuizScore: {
      type: Number,
      default: 0
    },
    completionRate: {
      type: Number,
      default: 0
    },
    lastStreak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    },
    activeDays: [Date]
  }
}, {
  timestamps: true
});

// Indexes for better query performance
progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
progressSchema.index({ 'lessonsProgress.lessonId': 1 });
progressSchema.index({ lastAccessed: -1 });

// Update analytics before saving
progressSchema.pre('save', function(next) {
  // Update completion rate
  const totalLessons = this.lessonsProgress.length;
  const completedLessons = this.lessonsProgress.filter(
    lesson => lesson.status === 'completed'
  ).length;
  
  this.overallProgress = (completedLessons / totalLessons) * 100 || 0;
  
  // Update average quiz score
  if (this.quizScores.length > 0) {
    const totalScore = this.quizScores.reduce((acc, curr) => {
      return acc + (curr.score / curr.maxScore) * 100;
    }, 0);
    this.analytics.averageQuizScore = totalScore / this.quizScores.length;
  }
  
  // Update completion rate in analytics
  this.analytics.completionRate = this.overallProgress;
  
  // Update last accessed
  this.lastAccessed = new Date();
  
  next();
});

export default mongoose.model<IProgress>('Progress', progressSchema);
