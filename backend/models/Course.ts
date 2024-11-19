import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  category: 'AI' | 'ML' | 'DL' | 'Math' | 'Programming';
  thumbnail: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: {
    courseId: mongoose.Types.ObjectId;
    description: string;
  }[];
  learningObjectives: string[];
  syllabus: {
    weekNumber: number;
    title: string;
    description: string;
    lessons: mongoose.Types.ObjectId[];
  }[];
  duration: {
    weeks: number;
    hoursPerWeek: number;
  };
  instructor: {
    userId: mongoose.Types.ObjectId;
    name: string;
    bio: string;
    avatar?: string;
  };
  enrolledStudents: {
    userId: mongoose.Types.ObjectId;
    enrollmentDate: Date;
    progress: number;
    lastAccessed: Date;
    completed: boolean;
    certificateIssued?: boolean;
  }[];
  ratings: {
    userId: mongoose.Types.ObjectId;
    rating: number;
    review?: string;
    date: Date;
  }[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  pricing?: {
    price: number;
    currency: string;
    discountPrice?: number;
    discountEnds?: Date;
  };
  statistics: {
    totalEnrolled: number;
    averageRating: number;
    completionRate: number;
    averageTimeToComplete: number;
  };
}

const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['AI', 'ML', 'DL', 'Math', 'Programming'],
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  prerequisites: [{
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    description: String
  }],
  learningObjectives: [{
    type: String,
    required: true
  }],
  syllabus: [{
    weekNumber: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: String,
    lessons: [{
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    }]
  }],
  duration: {
    weeks: {
      type: Number,
      required: true
    },
    hoursPerWeek: {
      type: Number,
      required: true
    }
  },
  instructor: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    avatar: String
  },
  enrolledStudents: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0
    },
    lastAccessed: {
      type: Date,
      default: Date.now
    },
    completed: {
      type: Boolean,
      default: false
    },
    certificateIssued: {
      type: Boolean,
      default: false
    }
  }],
  ratings: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    review: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  pricing: {
    price: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    discountPrice: Number,
    discountEnds: Date
  },
  statistics: {
    totalEnrolled: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    completionRate: {
      type: Number,
      default: 0
    },
    averageTimeToComplete: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
courseSchema.index({ category: 1, status: 1 });
courseSchema.index({ tags: 1 });
courseSchema.index({ 'enrolledStudents.userId': 1 });
courseSchema.index({ difficulty: 1 });

// Virtual for total enrolled students
courseSchema.virtual('totalEnrolledCount').get(function() {
  return this.enrolledStudents.length;
});

// Virtual for average rating
courseSchema.virtual('averageRatingScore').get(function() {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return sum / this.ratings.length;
});

// Update statistics before saving
courseSchema.pre('save', function(next) {
  if (this.isModified('enrolledStudents') || this.isModified('ratings')) {
    this.statistics.totalEnrolled = this.enrolledStudents.length;
    this.statistics.averageRating = this.averageRatingScore;
    this.statistics.completionRate = 
      (this.enrolledStudents.filter(student => student.completed).length / 
      this.enrolledStudents.length) * 100 || 0;
  }
  next();
});

export default mongoose.model<ICourse>('Course', courseSchema);
