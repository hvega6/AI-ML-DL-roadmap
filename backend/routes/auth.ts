import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { IUser } from '../models/User';

const router = express.Router();

// Helper function to generate JWT token
const generateToken = (user: IUser) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1d' }
  );
};

// Register
router.post('/register', async (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    const token = generateToken(user);
    res.json({ token, user: { id: user._id, email: user.email, username: user.username } });
  })(req, res, next);
});

// Login
router.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
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
  (req, res) => {
    const user = req.user as IUser;
    const token = generateToken(user);
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

// Get current user
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.user as IUser;
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
router.post('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

export default router;
