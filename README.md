# AI/ML/DL Learning Platform

    ## Overview
    This is a full-stack web application designed for an AI/ML/DL learning platform. It includes features such as dynamic lesson pages, project submissions with grading feedback, capstone collaboration tools, and user dashboards.

    ## Setup Instructions
    1. Clone the repository.
    2. Navigate to the `frontend` directory and run `npm install && npm run dev`.
    3. Navigate to the `backend` directory and run `npm install && npm start`.

    ## Features
    - **Home Page**: Introduction to the platform with an overview of features and navigation links.
    - **Lesson Page**: Dynamic display of lessons, embedded quizzes, and an interactive Python code editor.
    - **Project Submission Page**: Allow users to upload project files or provide a GitHub link. Include grading feedback and a progress tracker.
    - **Capstone Collaboration Page**: Team management tools, file sharing, and discussion board for capstone projects.
    - **Dashboard Page**: Personalized user progress, badges, deadlines, and upcoming lessons/projects.

    ## Technical Explanation
    - **Frontend**: React.js with TypeScript and Vite. Uses React Router for navigation and Axios for API communication.
    - **Backend**: Node.js with Express and TypeScript. Includes JWT-based authentication and CRUD operations for lessons, projects, capstones, and user progress.
    - **Database**: MongoDB with Mongoose schemas.

    ## Lessons Learned
    - The importance of modular code organization in both frontend and backend development.
    - Best practices for API design and security using JWT.
    - Efficient data modeling and indexing strategies in MongoDB.

    ## Future Improvements
    - Implement real-time collaboration features for capstone projects.
    - Add more interactive elements to the lesson pages, such as video tutorials and live coding sessions.
    - Enhance the grading system with automated feedback mechanisms.
