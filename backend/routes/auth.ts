import express, { Request, Response } from 'express';
import { User, IUser } from '../models/User';
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
    console.log('Registration attempt for email:', email);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create user with plain password - mongoose will hash it
    const user = new User({
      email,
      password, // Mongoose pre-save hook will hash this
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
    console.log('User saved successfully:', email);

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id.toString());
    console.log('Generated tokens for new user');

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        preferences: user.preferences
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

interface LoginBody {
  email: string;
  password: string;
}

const login: AsyncRequestHandler<{}, any, LoginBody> = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }
    console.log('User found:', user.email);
    console.log('User has password:', !!user.password);

    // Check password
    try {
      const isMatch = await user.comparePassword(password);
      console.log('Password match result:', isMatch);
      if (!isMatch) {
        console.log('Password does not match');
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }
    } catch (err) {
      console.error('Error comparing passwords:', err);
      res.status(500).json({ message: 'Error verifying credentials' });
      return;
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id.toString());
    console.log('Generated tokens for user:', user.email);

    // Return user data and tokens
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        preferences: user.preferences
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
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
