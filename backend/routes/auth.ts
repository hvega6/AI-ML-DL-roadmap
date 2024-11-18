import express from 'express';
    import bcrypt from 'bcryptjs';
    import jwt from 'jsonwebtoken';
    import User from '../models/User';

    const router = express.Router();

    // Register
    router.post('/register', async (req, res) => {
      try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Login
    router.post('/login', async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token });
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Logout
    router.post('/logout', (req, res) => {
      res.send('User logged out');
    });

    export default router;
