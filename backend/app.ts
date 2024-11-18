import express from 'express';
    import mongoose from 'mongoose';
    import cors from 'cors';

    const app = express();
    const PORT = process.env.PORT || 5000;

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Connect to MongoDB
    mongoose.connect('mongodb://localhost:27017/ai-learning-platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => console.log('MongoDB connected'))
      .catch(err => console.error('MongoDB connection error:', err));

    // Routes
    app.get('/', (req, res) => {
      res.send('AI/ML/DL Learning Platform Backend');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
