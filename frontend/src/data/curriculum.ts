import { Curriculum, Phase, Lesson, Project, Capstone } from '../types/lessons';

const phases: Phase[] = [
  {
    number: 1,
    title: 'Fundamentals and Basic Concepts',
    description: 'Learn the foundational concepts of AI, ML, and DL, including basic Python programming and neural networks.',
    weeks: [1, 2, 3, 4, 5, 6],
  },
  {
    number: 2,
    title: 'Intermediate Techniques and Applications',
    description: 'Explore NLP, speech recognition, robotics, and hardware acceleration.',
    weeks: [7, 8, 9, 10, 11, 12],
  },
  {
    number: 3,
    title: 'Advanced Topics and Techniques',
    description: 'Master time series forecasting, reinforcement learning, and model security.',
    weeks: [13, 14, 15, 16, 17, 18, 19, 20],
  },
];

const lessons: Lesson[] = [
  {
    id: 'week1',
    weekNumber: 1,
    phase: 1,
    title: 'Introduction to AI, ML, and DL',
    description: 'Understand the fundamentals of AI, ML, and DL and their real-world applications.',
    content: {
      theory: {
        title: 'Understanding AI, ML, and DL',
        points: [
          'What is AI? How does it relate to ML and DL?',
          'Real-world applications: healthcare, finance, robotics.',
        ],
      },
      code: {
        title: 'Basic Linear Regression',
        description: 'A basic Python program using Scikit-learn for a simple linear regression task.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'AI/ML/DL Identification',
          description: 'Identify examples of AI, ML, and DL from scenarios.',
        },
        coding: {
          title: 'Linear Regression Implementation',
          description: 'Implement a simple linear regression model.',
        },
      },
    },
  },
  // Add more lessons here...
];

const projects: Project[] = [
  {
    id: 'project1',
    title: 'Linear regression for housing prices',
    description: 'Build a linear regression model to predict housing prices based on various features.',
    weekNumber: 1,
    difficulty: 'beginner',
  },
  {
    id: 'project2',
    title: 'Decision tree classifier for the Iris dataset',
    description: 'Create a decision tree classifier to categorize Iris flowers.',
    weekNumber: 2,
    difficulty: 'beginner',
  },
  // Add more projects...
];

const capstones: Capstone[] = [
  {
    id: 'capstone1',
    weekNumber: 6,
    title: 'Image Classification Pipeline',
    objective: 'Build a CNN pipeline to classify CIFAR-10 images.',
    deliverables: [
      'Data preprocessing and augmentation',
      'Model training and evaluation',
    ],
  },
  {
    id: 'capstone2',
    weekNumber: 12,
    title: 'Multimodal AI System',
    objective: 'Create a system integrating NLP and speech recognition.',
    deliverables: [
      'Text translation using BERT',
      'Speech-to-text processing pipeline',
    ],
  },
  {
    id: 'capstone3',
    weekNumber: 20,
    title: 'Autonomous Financial Advisor',
    objective: 'Design a system combining LSTM forecasting and DQN decision-making.',
    deliverables: [
      'Stock trend predictions',
      'Optimized trading strategies',
    ],
  },
];

export const curriculum: Curriculum = {
  phases,
  lessons,
  projects,
  capstones,
};

export default curriculum;
