import express, { Request, Response, NextFunction } from 'express';
import { Lesson, ILesson } from '../models/Lesson';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// Get all lessons
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lessons = await Lesson.find().sort({ order: 1 });
    return res.json(lessons);
  } catch (error) {
    next(error);
  }
});

// Get a single lesson
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        message: 'Lesson not found',
        errors: ['The requested lesson does not exist']
      });
    }
    return res.json(lesson);
  } catch (error) {
    next(error);
  }
});

// Create a lesson
router.post('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, order, quiz } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({
        message: 'Missing required fields',
        errors: ['Title and content are required']
      });
    }

    const lesson = await Lesson.create({
      title,
      content,
      order,
      quiz: quiz || []
    }) as ILesson;

    return res.status(201).json(lesson);
  } catch (error) {
    next(error);
  }
});

// Update a lesson
router.put('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({
        message: 'Lesson not found',
        errors: ['The requested lesson does not exist']
      });
    }

    return res.json(updatedLesson);
  } catch (error) {
    next(error);
  }
});

// Delete a lesson
router.delete('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedLesson = await Lesson.findByIdAndDelete(id);

    if (!deletedLesson) {
      return res.status(404).json({
        message: 'Lesson not found',
        errors: ['The requested lesson does not exist']
      });
    }

    return res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
