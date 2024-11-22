import express from 'express';
import User from '../models/User';

const router = express.Router();

// Get user progress
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');
    res.json(user.progress);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update user progress
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, { $set: { progress: req.body.progress } }, { new: true });
    if (!updatedUser) return res.status(404).send('User not found');
    res.json(updatedUser.progress);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
