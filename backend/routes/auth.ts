import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

// Generate tokens
const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// Register
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
        errors: ['Email and password are required']
      });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password is too weak',
        errors: ['Password must contain at least one uppercase letter, one lowercase letter, and one number']
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ 
        message: 'User already exists',
        errors: ['Email is already taken']
      });
    }

    user = await User.create({
      email,
      password,
      role: 'student',
      preferences: { theme: 'light' },
      progress: {
        completedLessons: [],
        currentLesson: null,
        quizScores: []
      }
    }) as IUser;

    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
        errors: ['Email and password are required']
      });
    }

    const user = await User.findOne({ email }) as IUser;
    if (!user) {
      return res.status(401).json({
        message: 'Authentication failed',
        errors: ['Invalid email or password']
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Authentication failed',
        errors: ['Invalid email or password']
      });
    }

    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    return res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    next(error);
  }
});

// Refresh Token
router.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ 
        message: 'Refresh token is required',
        errors: ['No refresh token provided']
      });
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { userId: string };
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId);

    return res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: 'Invalid refresh token',
        errors: ['Refresh token is invalid or expired']
      });
    }
    next(error);
  }
});

export default router;
