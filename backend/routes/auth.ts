import express, { Request, Response } from 'express';
import { User, IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../utils/jwt';
import authMiddleware from '../middleware/auth';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const router = express.Router();

interface RegisterBody {
  email: string;
  password: string;
  role?: 'student' | 'admin';
}

type AsyncRequestHandler<P = {}, ResBody = any, ReqBody = any> = (
  req: Request<P, ResBody, ReqBody>,
  res: Response<ResBody>
) => Promise<void>;

const register: AsyncRequestHandler<{}, any, RegisterBody> = async (req, res) => {
  try {
    const { email, password, role = 'student' } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      role,
      progress: {
        completedLessons: [],
        currentLesson: null,
        quizScores: []
      },
      preferences: {
        theme: 'light'
      }
    });

    await user.save();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

interface LoginBody {
  email: string;
  password: string;
}

const login: AsyncRequestHandler<{}, any, LoginBody> = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

interface RefreshTokenBody {
  refreshToken: string;
}

const refreshToken: AsyncRequestHandler<{}, any, RefreshTokenBody> = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      res.status(401).json({ message: 'Refresh token is required' });
      return;
    }

    // Verify refresh token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key') as { userId: string };
    
    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId);

    res.json({
      message: 'Tokens refreshed successfully',
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid refresh token' });
      return;
    }
    console.error('Token refresh error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

export default router;
