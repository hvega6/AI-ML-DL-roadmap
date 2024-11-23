import express, { Request, Response, RequestHandler } from 'express';
import { User, IUser } from '../models/User';
import authMiddleware from '../middleware/auth';
import mongoose from 'mongoose';

const router = express.Router();
const protectedRouter = express.Router();

interface ProgressParams {
  userId: string;
}

interface UpdateProgressBody {
  completedLessons?: string[];
  currentLesson?: string | null;
  quizScores?: Array<{
    quizId: string;
    score: number;
    dateTaken: Date;
  }>;
}

interface UpdatePreferencesBody {
  theme?: 'light' | 'dark';
}

interface AuthenticatedRequest extends Request {
  user: IUser & mongoose.Document;
}

type AsyncRequestHandler<P = {}, ResBody = any, ReqBody = any> = (
  req: Request<P, ResBody, ReqBody> & { user: IUser & mongoose.Document },
  res: Response<ResBody>
) => Promise<void>;

// Get user progress
const getUserProgress: AsyncRequestHandler<ProgressParams> = async (req, res) => {
  try {
    const { userId } = req.params;
    const requestingUser = req.user;

    // Check if user is authorized to access this progress
    if (requestingUser.id !== userId && requestingUser.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to access this progress' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      progress: user.progress,
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user progress
const updateUserProgress: AsyncRequestHandler<ProgressParams, any, UpdateProgressBody> = async (req, res) => {
  try {
    const { userId } = req.params;
    const requestingUser = req.user;

    // Check if user is authorized to update this progress
    if (requestingUser.id !== userId && requestingUser.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to update this progress' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { progress: { ...req.body } } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      message: 'Progress updated successfully',
      progress: user.progress
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user preferences
const updateUserPreferences: AsyncRequestHandler<ProgressParams, any, UpdatePreferencesBody> = async (req, res) => {
  try {
    const { userId } = req.params;
    const requestingUser = req.user;

    // Check if user is authorized to update preferences
    if (requestingUser.id !== userId && requestingUser.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to update these preferences' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { preferences: req.body } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Protected routes
protectedRouter.use(authMiddleware as RequestHandler);

// Cast route handlers to unknown first to satisfy TypeScript
protectedRouter.get('/:userId', getUserProgress as unknown as RequestHandler);
protectedRouter.put('/:userId', updateUserProgress as unknown as RequestHandler);
protectedRouter.put('/:userId/preferences', updateUserPreferences as unknown as RequestHandler);

router.use(protectedRouter);

export default router;
