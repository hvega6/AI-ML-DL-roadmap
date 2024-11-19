# AI/ML/DL Learning Platform Backend

A robust backend service for the AI/ML/DL Learning Platform, built with TypeScript, Express, and MongoDB.

## 🚀 Features

- **Authentication System**
  - Local authentication (email/password)
  - JWT-based authentication
  - Google OAuth integration
  - Secure password hashing
  - Token-based session management

- **Type Safety**
  - Full TypeScript implementation
  - Strict type checking
  - Type guards and interfaces
  - Comprehensive error handling

- **Database Integration**
  - MongoDB with Mongoose ODM
  - Type-safe schemas
  - Efficient data modeling
  - Secure connection handling

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js
- **Security**: bcryptjs, JWT
- **OAuth**: Google OAuth 2.0

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas URI)
- Google OAuth credentials (for Google sign-in)
- TypeScript knowledge

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication
   JWT_SECRET=your_jwt_secret_key
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts     # Database configuration
│   │   └── passport.ts     # Passport authentication strategies
│   ├── models/
│   │   └── User.ts         # User model and schema
│   ├── routes/
│   │   └── auth.ts         # Authentication routes
│   ├── types/
│   │   └── index.ts        # TypeScript type definitions
│   └── app.ts              # Express application setup
├── .env                    # Environment variables
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 🔒 API Endpoints

### Authentication Routes

#### Local Authentication
- **POST** `/auth/register`
  - Register a new user
  - Body: `{ email: string, password: string, username: string }`

- **POST** `/auth/login`
  - Login with email and password
  - Body: `{ email: string, password: string }`

#### Google OAuth
- **GET** `/auth/google`
  - Initiate Google OAuth flow

- **GET** `/auth/google/callback`
  - Google OAuth callback URL

#### Protected Routes
- **GET** `/auth/profile`
  - Get user profile (requires authentication)
  - Header: `Authorization: Bearer <token>`

- **POST** `/auth/logout`
  - Logout user
  - Header: `Authorization: Bearer <token>`

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies
- CORS protection
- Rate limiting
- Input validation
- XSS protection

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Development Guidelines

1. **TypeScript**
   - Use strict mode
   - Define interfaces for all data structures
   - Implement proper error handling
   - Use type guards where necessary

2. **API Design**
   - Follow RESTful principles
   - Use proper HTTP methods
   - Implement proper error responses
   - Document all endpoints

3. **Security**
   - Never store sensitive data in code
   - Use environment variables for secrets
   - Implement proper validation
   - Follow security best practices

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue in the repository or contact the development team.

## 🙏 Acknowledgments

- Express.js team
- Passport.js contributors
- MongoDB team
- TypeScript team
