import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
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
router.route('/register').post(async (req: Request, res: Response) => {
  console.log('Register request received:', { email: req.body.email });
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({
        message: 'All fields are required',
        errors: ['Email and password are required']
      });
    }

    // Check password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password is too weak',
        errors: ['Password must contain at least one uppercase letter, one lowercase letter, and one number']
      });
    }

    // Check if user exists
    console.log('Checking for existing user...');
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', { email });
      return res.status(400).json({ 
        message: 'User already exists',
        errors: ['Email is already taken']
      });
    }

    // Create new user
    console.log('Creating new user...');
    user = new User({
      email,
      password,
      role: 'student',
      preferences: {
        theme: 'light'
      },
      progress: {
        completedLessons: [],
        currentLesson: null,
        quizScores: []
      }
    });

    await user.save();
    console.log('User saved successfully:', user._id);

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    // Return user data and tokens
    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({ 
      message: 'Server error during registration',
      errors: [error.message]
    });
  }
});

// Login
router.route('/login').post(async (req: Request, res: Response) => {
  console.log('Login request received:', { email: req.body.email });
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({
        message: 'Validation failed',
        errors: ['Email and password are required']
      });
    }

    // Find user
    console.log('Finding user...');
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({
        message: 'Authentication failed',
        errors: ['Invalid email or password']
      });
    }

    // Check password
    console.log('Checking password...');
    try {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        console.log('Invalid password for user:', email);
        return res.status(401).json({
          message: 'Authentication failed',
          errors: ['Invalid email or password']
        });
      }
    } catch (error) {
      console.error('Password comparison error:', error);
      return res.status(500).json({
        message: 'Error during authentication',
        errors: ['An error occurred while verifying your credentials']
      });
    }

    console.log('Login successful for user:', user._id);

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    // Return user data and tokens
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      errors: [error.message]
    });
  }
});

// Refresh Token
router.route('/refresh-token').post(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ 
      message: 'Authentication failed',
      errors: ['Refresh Token is required']
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { userId: string };
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId);

    res.json({
      message: 'Token refresh successful',
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    res.status(401).json({ 
      message: 'Authentication failed',
      errors: ['Invalid refresh token']
    });
  }
});

export default router;
