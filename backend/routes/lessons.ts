import express from 'express';
    import Lesson from '../models/Lesson';

    const router = express.Router();

    // Get all lessons
    router.get('/', async (req, res) => {
      try {
        const lessons = await Lesson.find();
        res.json(lessons);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Create a lesson
    router.post('/', async (req, res) => {
      try {
        const { title, content, quiz } = req.body;
        const lesson = new Lesson({ title, content, quiz });
        await lesson.save();
        res.status(201).json(lesson);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Update a lesson
    router.put('/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const updatedLesson = await Lesson.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedLesson) return res.status(404).send('Lesson not found');
        res.json(updatedLesson);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Delete a lesson
    router.delete('/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const deletedLesson = await Lesson.findByIdAndDelete(id);
        if (!deletedLesson) return res.status(404).send('Lesson not found');
        res.send('Lesson deleted');
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    export default router;
