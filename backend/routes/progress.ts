import express, { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/User';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// Get user progress
router.get('/:userId', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId) as IUser;
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        errors: ['The requested user does not exist']
      });
    }

    // Only allow users to access their own progress or admins to access any progress
    if (req.user?.id !== userId && req.user?.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied',
        errors: ['You do not have permission to view this user\'s progress']
      });
    }

    return res.json({
      progress: user.progress,
      preferences: user.preferences
    });
  } catch (error) {
    next(error);
  }
});

// Update user progress
router.put('/:userId', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { lessonId, completed, quizScore } = req.body;

    // Only allow users to update their own progress or admins to update any progress
    if (req.user?.id !== userId && req.user?.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied',
        errors: ['You do not have permission to update this user\'s progress']
      });
    }

    const user = await User.findById(userId) as IUser;
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        errors: ['The requested user does not exist']
      });
    }

    // Update completed lessons
    if (completed && !user.progress.completedLessons.includes(lessonId)) {
      user.progress.completedLessons.push(lessonId);
    }

    // Update current lesson
    if (lessonId) {
      user.progress.currentLesson = lessonId;
    }

    // Update quiz score if provided
    if (quizScore !== undefined) {
      user.progress.quizScores.push({
        quizId: lessonId,
        score: quizScore,
        dateTaken: new Date()
      });
    }

    await user.save();

    return res.json({
      message: 'Progress updated successfully',
      progress: user.progress
    });
  } catch (error) {
    next(error);
  }
});

// Update user preferences
router.put('/:userId/preferences', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { theme } = req.body;

    // Only allow users to update their own preferences or admins to update any preferences
    if (req.user?.id !== userId && req.user?.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied',
        errors: ['You do not have permission to update this user\'s preferences']
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { 'preferences.theme': theme } },
      { new: true, runValidators: true }
    ) as IUser;

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        errors: ['The requested user does not exist']
      });
    }

    return res.json({
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });
  } catch (error) {
    next(error);
  }
});

export default router;
