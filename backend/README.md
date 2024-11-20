# AI/ML/DL Learning Platform Backend

A robust backend system for an AI/ML/DL educational platform built with TypeScript, Express, and MongoDB.

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the development server:
```bash
npm run dev
```

## 📚 API Documentation

### Authentication Routes
```typescript
POST /api/auth/register
// Register a new user
{
  "username": string,
  "email": string,
  "password": string
}

POST /api/auth/login
// Login with credentials
{
  "email": string,
  "password": string
}

POST /api/auth/google
// Google OAuth login

GET /api/auth/logout
// Logout current user

GET /api/auth/me
// Get current user profile
```

### Course Routes
```typescript
GET /api/courses
// List all courses
Query params:
- category: 'AI' | 'ML' | 'DL' | 'Math' | 'Programming'
- difficulty: 'beginner' | 'intermediate' | 'advanced'
- status: 'draft' | 'published' | 'archived'
- page: number
- limit: number

POST /api/courses
// Create a new course (admin only)
{
  "title": string,
  "description": string,
  "category": "AI" | "ML" | "DL" | "Math" | "Programming",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "thumbnail": string,
  "learningObjectives": string[],
  "duration": {
    "weeks": number,
    "hoursPerWeek": number
  }
}

GET /api/courses/:id
// Get course details

PUT /api/courses/:id
// Update course (admin only)

DELETE /api/courses/:id
// Delete course (admin only)

POST /api/courses/:id/enroll
// Enroll in a course

GET /api/courses/:id/progress
// Get course progress for current user
```

### Lesson Routes
```typescript
GET /api/courses/:courseId/lessons
// List all lessons in a course

POST /api/courses/:courseId/lessons
// Create a new lesson (admin only)
{
  "title": string,
  "description": string,
  "content": [{
    "type": "text" | "video" | "code" | "quiz",
    "data": string,
    "duration": number
  }],
  "order": number
}

GET /api/lessons/:id
// Get lesson details

PUT /api/lessons/:id
// Update lesson (admin only)

DELETE /api/lessons/:id
// Delete lesson (admin only)

POST /api/lessons/:id/complete
// Mark lesson as completed

POST /api/lessons/:id/quiz
// Submit quiz answers
{
  "answers": [{
    "questionId": string,
    "answer": number
  }]
}
```

### Progress Routes
```typescript
GET /api/progress
// Get progress for all enrolled courses

GET /api/progress/:courseId
// Get detailed progress for a specific course

POST /api/progress/:lessonId/notes
// Add notes to a lesson
{
  "note": string
}

POST /api/progress/:lessonId/bookmarks
// Add bookmark to a lesson
{
  "timestamp": number,
  "note": string
}
```

### User Routes
```typescript
GET /api/users/profile
// Get user profile

PUT /api/users/profile
// Update user profile
{
  "displayName": string,
  "bio": string,
  "preferences": {
    "notifications": boolean,
    "language": string,
    "theme": "light" | "dark"
  }
}

GET /api/users/achievements
// Get user achievements

GET /api/users/courses
// Get user's enrolled courses
```

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## 📝 Models

### User Model
- Username, email, password
- Profile information
- Progress tracking
- Preferences
- Achievements

### Course Model
- Title, description, category
- Syllabus and learning objectives
- Enrollment tracking
- Ratings and reviews
- Progress statistics

### Lesson Model
- Multiple content types
- Quizzes and assignments
- Resources and attachments
- Progress tracking

### Progress Model
- Course and lesson progress
- Quiz scores
- Notes and bookmarks
- Analytics and statistics

## 🛠️ Development

### Prerequisites
- Node.js >= 14
- MongoDB >= 4.4
- TypeScript >= 4.5

### Environment Variables
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-learning
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Available Scripts
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
npm run test    # Run tests
```

## 🔍 Error Handling

All API errors follow this format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {}
  }
}
```

Common error codes:
- `AUTH_REQUIRED`: Authentication required
- `INVALID_CREDENTIALS`: Invalid login credentials
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid input data
- `PERMISSION_DENIED`: Insufficient permissions
