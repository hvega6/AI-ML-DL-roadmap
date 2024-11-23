import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import models
import './models/Lesson';

import authRoutes from './routes/auth';
import lessonRoutes from './routes/lessons';
import progressRoutes from './routes/progress';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    console.log(`Database: ${process.env.DATABASE_NAME}`);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.error('Connection Details:', {
      database: process.env.DATABASE_NAME,
      uri: process.env.MONGODB_URI?.replace(/:([^:@]{8})[^:@]*@/, ':****@') // Mask credentials
    });
    // Don't exit process, let the error handler deal with it
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
    errors: ['The requested resource does not exist']
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
