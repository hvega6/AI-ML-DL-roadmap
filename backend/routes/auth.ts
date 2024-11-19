import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { IUser } from '../models/User';

const router = express.Router();

// Define authenticated request type
interface AuthenticatedRequest extends Request {
  user: IUser;
}

// Type guard to check if request is authenticated
function isAuthenticated(req: Request): req is AuthenticatedRequest {
  return req.user !== undefined;
}

// Helper function to generate JWT token
const generateToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1d' }
  );
};

// Register
router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local-signup', (err: Error, user: IUser | false, info: { message: string }) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    if (!user) {
      res.status(400).json({ message: info.message });
      return;
    }
    const token = generateToken(user);
    res.json({ token, user: { id: user._id, email: user.email, username: user.username } });
  })(req, res, next);
});

// Login
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: Error | null, user: IUser | false, info: { message: string }) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    if (!user) {
      res.status(401).json({ message: info.message });
      return;
    }
    const token = generateToken(user);
    res.json({ token, user: { id: user._id, email: user.email, username: user.username } });
  })(req, res, next);
});

// Google OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req: Request, res: Response) => {
    if (!isAuthenticated(req)) {
      res.status(401).json({ message: 'Authentication failed' });
      return;
    }
    const token = generateToken(req.user);
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3001'}/auth/callback?token=${token}`);
  }
);

// Get current user
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response) => {
    if (!isAuthenticated(req)) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }
    const user = req.user;
    res.json({
      id: user._id,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      avatar: user.avatar,
      progress: user.progress,
      badges: user.badges
    });
  }
);

// Logout
router.post('/logout', (req: Request, res: Response) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

export default router;
