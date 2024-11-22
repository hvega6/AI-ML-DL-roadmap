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
```
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
