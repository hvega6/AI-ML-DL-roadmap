import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ILesson } from '../models/Lesson';
const Lesson = mongoose.model<ILesson>('Lesson');
import authMiddleware from '../middleware/auth';

const router = express.Router();
const protectedRouter = express.Router();

interface LessonParams {
  id?: string;
}

interface CreateLessonBody {
  title: string;
  description: string;
  courseId: string;
  order: number;
  content: {
    type: 'text' | 'video' | 'code' | 'quiz';
    data: string;
    duration?: number;
  }[];
  resources?: {
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
  prerequisites?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

type AsyncRequestHandler<P = {}, ResBody = any, ReqBody = any> = (
  req: Request<P, ResBody, ReqBody>,
  res: Response<ResBody>
) => Promise<void>;

// Get all lessons
const getAllLessons: AsyncRequestHandler = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (error) {
    console.error('Get all lessons error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get lesson by ID
const getLessonById: AsyncRequestHandler<LessonParams> = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }
    res.json(lesson);
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new lesson (admin only)
const createLesson: AsyncRequestHandler<{}, any, CreateLessonBody> = async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update lesson (admin only)
const updateLesson: AsyncRequestHandler<LessonParams, any, Partial<CreateLessonBody>> = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lesson) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }
    res.json(lesson);
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete lesson (admin only)
const deleteLesson: AsyncRequestHandler<LessonParams> = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }
    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Public routes
router.get('/', getAllLessons);
router.get('/:id', getLessonById);

// Protected routes
protectedRouter.use(authMiddleware as express.RequestHandler);

protectedRouter.post('/', createLesson as express.RequestHandler);
protectedRouter.put('/:id', updateLesson as express.RequestHandler);
protectedRouter.delete('/:id', deleteLesson as express.RequestHandler);

router.use(protectedRouter);

export default router;
