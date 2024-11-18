import express from 'express';
    import Project from '../models/Project';

    const router = express.Router();

    // Get all projects
    router.get('/', async (req, res) => {
      try {
        const projects = await Project.find();
        res.json(projects);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Create a project
    router.post('/', async (req, res) => {
      try {
        const { title, description, submissionLink, deadline } = req.body;
        const project = new Project({ title, description, submissionLink, deadline });
        await project.save();
        res.status(201).json(project);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Update a project
    router.put('/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProject) return res.status(404).send('Project not found');
        res.json(updatedProject);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Delete a project
    router.delete('/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) return res.status(404).send('Project not found');
        res.send('Project deleted');
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    export default router;
