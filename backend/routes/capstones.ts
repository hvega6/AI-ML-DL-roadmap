import express from 'express';
    import Capstone from '../models/Capstone';

    const router = express.Router();

    // Get all capstones
    router.get('/', async (req, res) => {
      try {
        const capstones = await Capstone.find();
        res.json(capstones);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Create a capstone
    router.post('/', async (req, res) => {
      try {
        const { title, description, teamMembers } = req.body;
        const capstone = new Capstone({ title, description, teamMembers });
        await capstone.save();
        res.status(201).json(capstone);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Update a capstone
    router.put('/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const updatedCapstone = await Capstone.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCapstone) return res.status(404).send('Capstone not found');
        res.json(updatedCapstone);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Delete a capstone
    router.delete('/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const deletedCapstone = await Capstone.findByIdAndDelete(id);
        if (!deletedCapstone) return res.status(404).send('Capstone not found');
        res.send('Capstone deleted');
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    export default router;
