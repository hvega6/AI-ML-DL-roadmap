# AI Learning Platform Frontend

## 🚀 Project Overview

This is a comprehensive frontend application for an AI Learning Platform, designed to provide an interactive and intuitive learning experience for users interested in AI, Machine Learning, and Data Science.

## 🛠 Tech Stack

- **Framework**: React with TypeScript
- **State Management**: React Context
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Charting**: Chart.js
- **Authentication**: JWT-based

## 📂 Project Structure

```
frontend/
│
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React context providers
│   ├── services/         # API and utility services
│   ├── types/            # TypeScript type definitions
│   ├── views/            # Main page/route components
│   ├── App.tsx           # Main application component
│   └── index.tsx         # Entry point
```

## 🌟 Key Features

### 1. Authentication System
- Secure JWT-based authentication
- Login and registration flows
- Protected routes
- Session management
- Automatic token refresh and logout

### 2. Dashboard
- Interactive user progress visualization
- Three main charts:
  - Lesson Completion (Doughnut Chart)
  - Skill Proficiency (Bar Chart)
  - Learning Time (Line Chart)
- Dark/Light mode support
- Responsive design

### 3. Learning Modules
- Structured lesson progression
- Interactive lesson components
- Progress tracking
- Skill assessment

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend generates JWT token
3. Token stored in local storage
4. Subsequent API requests include token
5. Automatic logout on token expiration

## 📊 Dashboard Visualization

The dashboard provides three key visualizations:

### Lesson Completion
- Shows completed vs. remaining lessons
- Doughnut chart representation
- Dynamically updates based on user progress

### Skill Proficiency
- Displays proficiency across different skills
- Bar chart with skill-wise percentages
- Color-coded for better readability

### Learning Time
- Tracks total time spent learning
- Line chart showing cumulative learning hours

## 🎨 Theming

- Dark and Light mode support
- Consistent color schemes
- Adaptive chart colors
- Responsive design principles

## 🛠 Development Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to frontend directory
3. Run `npm install`
4. Start development server: `npm start`

### Environment Variables
Create a `.env` file with:
```bash
REACT_APP_API_URL=your_backend_api_url
REACT_APP_JWT_SECRET=your_jwt_secret
```

## 🚀 Build and Deployment

- Production build: `npm run build`
- Generates optimized static files in `build/` directory

## 🧪 Testing

- Unit tests: `npm test`
- Uses React Testing Library
- Coverage reports available

## 🔮 Future Roadmap
- Advanced analytics
- Personalized learning recommendations
- Social learning features
- Certification tracking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## 📜 License

[Your License Here - e.g., MIT]

## 💡 Contact

[Your Contact Information]

---

**Happy Learning! 🧠📚**

# 🎨 AI Learning Platform Frontend

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-4.1.0-646CFF.svg)](https://vitejs.dev/)

Modern, responsive frontend for the AI Learning Platform built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎯 **Component Architecture**: Modular and reusable React components
- 🌈 **Theme Support**: Dynamic dark/light mode with Tailwind
- 🎨 **Particle System**: Interactive background animations
- 📱 **Responsive Design**: Mobile-first approach
- 🔐 **Authentication**: JWT-based user authentication
- 🚀 **Performance**: Optimized builds with Vite

## 🛠️ Project Structure

```
frontend/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable UI components
│   ├── context/     # React context providers
│   ├── hooks/       # Custom React hooks
│   ├── views/       # Page components
│   ├── types/       # TypeScript type definitions
│   ├── utils/       # Utility functions
│   ├── App.tsx      # Root component
│   └── main.tsx     # Entry point
├── package.json     # Dependencies and scripts
└── vite.config.ts   # Vite configuration
```

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# .env
VITE_API_URL=http://localhost:5000
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🧪 Key Dependencies

- **@headlessui/react**: UI components
- **@heroicons/react**: Icon components
- **react-router-dom**: Routing
- **axios**: API requests
- **tailwindcss**: Styling
- **typescript**: Type safety
- **vite**: Build tool

## 🎨 Styling

We use Tailwind CSS for styling with custom configuration:

- Custom color schemes
- Responsive breakpoints
- Dark mode support
- Custom animations

## 🔧 Development Tools

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Vite** for fast development and optimized builds

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## 🎯 Best Practices

- Component composition
- Custom hooks for logic reuse
- Context for state management
- Lazy loading for optimized loading
- TypeScript for type safety
- Consistent code formatting

## 🔄 State Management

- React Context for global state
- Custom hooks for local state
- JWT token management
- Theme persistence
- Form state handling

## 🚀 Performance Optimization

- Code splitting
- Lazy loading
- Image optimization
- CSS purging
- Bundle size optimization

## 📝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---
Made with ❤️ using React and TypeScript
