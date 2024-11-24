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
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:3001',
      'https://ai-ml-dl-roadmap.onrender.com',
      'http://localhost:3000',
      'http://localhost:5173'
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // Increase preflight cache to 10 minutes
}));

// Security middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control'
  );
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const dbName = process.env.DATABASE_NAME || 'ai_roadmap';
const mongoUri = process.env.MONGODB_URI!;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: dbName // Explicitly set database name here
} as mongoose.ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    console.log(`Database: ${dbName}`);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.error('Connection Details:', {
      database: dbName,
      uri: mongoUri.replace(/:([^:@]{8})[^:@]*@/, ':****@') // Mask credentials
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
