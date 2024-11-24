# 🚀 AI Learning Platform Backend

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.x-green.svg)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)

Robust and scalable backend for the AI Learning Platform built with Node.js, Express, and MongoDB.

## ✨ Features

- 🔐 **Authentication**: JWT-based user authentication system
- 🎯 **RESTful APIs**: Well-structured endpoints following REST principles
- 📚 **MongoDB Integration**: Efficient data modeling and querying
- 🔄 **OpenAI Integration**: AI-powered features and content generation
- 🛡️ **Security**: Implementation of security best practices
- 📝 **Validation**: Request validation and error handling

## 🛠️ Project Structure

```
backend/
├── src/
│   ├── config/      # Configuration files
│   ├── controllers/ # Route controllers
│   ├── middleware/  # Custom middleware
│   ├── models/      # MongoDB models
│   ├── routes/      # API routes
│   ├── services/    # Business logic
│   ├── types/       # TypeScript types
│   ├── utils/       # Utility functions
│   └── app.ts       # Express app setup
├── tests/           # Test files
├── package.json     # Dependencies and scripts
└── tsconfig.json    # TypeScript configuration
```

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# .env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/progress` - Get learning progress

### Admin
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id` - Update user role/status
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/content` - List all content
- `POST /api/admin/content` - Create new content
- `PUT /api/admin/content/:id` - Update content
- `DELETE /api/admin/content/:id` - Delete content

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course

### Progress
- `POST /api/progress/update` - Update learning progress
- `GET /api/progress/stats` - Get learning statistics

## 🔧 Development Tools

- **TypeScript** for type safety
- **ESLint** for code linting
- **Jest** for testing
- **Nodemon** for development
- **MongoDB Atlas** for database

## 🛡️ Security Features

- JWT Authentication with Role-Based Access Control
- Request Rate Limiting
- CORS Configuration
- Input Validation
- Error Handling
- Security Headers
- Role Verification Middleware
- Admin Access Protection

## 📦 Key Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **cors**: CORS middleware
- **helmet**: Security headers
- **openai**: OpenAI API integration

## 🎯 Best Practices

- RESTful API design
- Middleware composition
- Error handling
- Input validation
- Security implementation
- Code organization
- TypeScript usage

## 🔍 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📊 Database Schema

### User
```typescript
{
  email: string
  password: string
  name: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive'
  progress: {
    courses: string[]
    completedLessons: string[]
    achievements: string[]
  }
  settings: {
    theme: string
    notifications: boolean
  }
}
```

### Course
```typescript
{
  title: string
  description: string
  lessons: [{
    title: string
    content: string
    order: number
    type: string
  }]
  requirements: string[]
  level: string
}
```

## 🚀 Deployment

1. Build the application:
```bash
npm run build
```

2. Set production environment variables
3. Start the server:
```bash
npm start
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---
Made with ❤️ using Node.js and TypeScript
