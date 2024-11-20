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
  // Phase 1: Fundamentals
  {
    id: 'week1',
    weekNumber: 1,
    phase: 1,
    title: 'Introduction to AI, ML, and DL',
    description: 'Understanding AI fundamentals and their real-world applications.',
    content: {
      theory: {
        title: 'AI Fundamentals',
        points: [
          'Definition and history of AI',
          'Real-world applications of AI',
        ],
      },
      code: {
        title: 'AI Basics Implementation',
        description: 'Explore basic AI concepts through simple coding exercises.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'AI Fundamentals Quiz',
          description: 'Test your understanding of AI fundamentals.',
        },
        coding: {
          title: 'AI Basics Project',
          description: 'Implement basic AI algorithms.',
        },
      },
    },
  },
  {
    id: 'week2',
    weekNumber: 2,
    phase: 1,
    title: 'Machine Learning Workflows',
    description: 'ML pipeline steps and learning types.',
    content: {
      theory: {
        title: 'ML Workflows',
        points: [
          'Steps in a machine learning pipeline',
          'Supervised, unsupervised, and reinforcement learning',
        ],
      },
      code: {
        title: 'ML Workflow Implementation',
        description: 'Implement a simple ML workflow using Python.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'ML Workflows Quiz',
          description: 'Evaluate your knowledge of ML workflows.',
        },
        coding: {
          title: 'ML Workflow Project',
          description: 'Create a basic ML pipeline.',
        },
      },
    },
  },
  {
    id: 'week3',
    weekNumber: 3,
    phase: 1,
    title: 'Neural Networks for Image Classification',
    description: 'Understanding neural networks and CNNs.',
    content: {
      theory: {
        title: 'Neural Networks Basics',
        points: [
          'Introduction to neural networks',
          'Convolutional Neural Networks (CNNs) for image classification',
        ],
      },
      code: {
        title: 'CNN Implementation',
        description: 'Implement a CNN using TensorFlow/Keras for image classification.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'Neural Networks Quiz',
          description: 'Test your understanding of neural networks and CNNs.',
        },
        coding: {
          title: 'CNN Project',
          description: 'Build a CNN to classify images from the CIFAR-10 dataset.',
        },
      },
    },
  },
  {
    id: 'week4',
    weekNumber: 4,
    phase: 1,
    title: 'Data Augmentation',
    description: 'Techniques for model generalization.',
    content: {
      theory: {
        title: 'Data Augmentation Techniques',
        points: [
          'Importance of data augmentation',
          'Common techniques: flipping, rotation, scaling',
        ],
      },
      code: {
        title: 'Data Augmentation Implementation',
        description: 'Apply data augmentation techniques using Keras.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'Data Augmentation Quiz',
          description: 'Assess your knowledge of data augmentation techniques.',
        },
        coding: {
          title: 'Augmentation Project',
          description: 'Enhance a dataset using data augmentation techniques.',
        },
      },
    },
  },
  {
    id: 'week5',
    weekNumber: 5,
    phase: 1,
    title: 'Training Basics',
    description: 'Neural network training fundamentals.',
    content: {
      theory: {
        title: 'Training Neural Networks',
        points: [
          'Backpropagation and optimization algorithms',
          'Overfitting and regularization techniques',
        ],
      },
      code: {
        title: 'Training Implementation',
        description: 'Train a neural network using TensorFlow/Keras.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'Training Concepts Quiz',
          description: 'Evaluate your understanding of training concepts.',
        },
        coding: {
          title: 'Training Project',
          description: 'Train a model on a dataset and evaluate its performance.',
        },
      },
    },
  },
  {
    id: 'week6',
    weekNumber: 6,
    phase: 1,
    title: 'Capstone One: Image Classification Pipeline',
    description: 'Build a CNN pipeline to classify CIFAR-10 images.',
    content: {
      theory: {
        title: 'Capstone Project Overview',
        points: [
          'Project objectives and requirements',
          'Pipeline components: data preparation, model training, evaluation',
        ],
      },
      code: {
        title: 'Capstone Implementation',
        description: 'Develop a complete image classification pipeline.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'Capstone Preparation Quiz',
          description: 'Prepare for the capstone project with a comprehensive quiz.',
        },
        coding: {
          title: 'Capstone Project',
          description: 'Implement the entire pipeline and present results.',
        },
      },
    },
  },
  // Phase 2: Intermediate
  {
    id: 'week7',
    weekNumber: 7,
    phase: 2,
    title: 'Natural Language Processing (NLP) Basics',
    description: 'Text preprocessing and applications.',
    content: {
      theory: {
        title: 'NLP Basics',
        points: [
          'Text preprocessing techniques',
          'Applications of NLP',
        ],
      },
      code: {
        title: 'NLP Basics Implementation',
        description: 'Implement basic NLP tasks using Python.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'NLP Basics Quiz',
          description: 'Test your understanding of NLP basics.',
        },
        coding: {
          title: 'NLP Basics Project',
          description: 'Create a simple NLP application.',
        },
      },
    },
  },
  {
    id: 'week8',
    weekNumber: 8,
    phase: 2,
    title: 'Advanced NLP Models',
    description: 'Transformer models and transfer learning.',
    content: {
      theory: {
        title: 'Advanced NLP Models',
        points: [
          'Introduction to Transformer models',
          'Transfer learning in NLP',
        ],
      },
      code: {
        title: 'Transformer Implementation',
        description: 'Implement a Transformer model using Python.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'Advanced NLP Quiz',
          description: 'Evaluate your understanding of advanced NLP models.',
        },
        coding: {
          title: 'Transformer Project',
          description: 'Build a Transformer-based NLP application.',
        },
      },
    },
  },
  {
    id: 'week9',
    weekNumber: 9,
    phase: 2,
    title: 'Speech Recognition',
    description: 'Audio processing and feature extraction.',
    content: {
      theory: {
        title: 'Speech Recognition Fundamentals',
        points: [
          'Audio signal processing',
          'Feature extraction techniques: MFCCs, spectrograms',
        ],
      },
      code: {
        title: 'Speech Recognition Implementation',
        description: 'Build a speech recognition model using Python.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'Speech Recognition Quiz',
          description: 'Test your knowledge of speech recognition concepts.',
        },
        coding: {
          title: 'Speech Recognition Project',
          description: 'Develop a simple speech recognition application.',
        },
      },
    },
  },
  {
    id: 'week10',
    weekNumber: 10,
    phase: 2,
    title: 'Robotics and Motion Planning',
    description: 'Robotics fundamentals and pathfinding.',
    content: {
      theory: {
        title: 'Introduction to Robotics',
        points: [
          'Robotics components and systems',
          'Pathfinding algorithms: A*, Dijkstra’s',
        ],
      },
      code: {
        title: 'Robotics Simulation',
        description: 'Simulate a robotic pathfinding task.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'Robotics Quiz',
          description: 'Evaluate your understanding of robotics concepts.',
        },
        coding: {
          title: 'Robotics Project',
          description: 'Implement a pathfinding algorithm in a robotic simulation.',
        },
      },
    },
  },
  {
    id: 'week11',
    weekNumber: 11,
    phase: 2,
    title: 'Hardware Acceleration',
    description: 'GPU programming and optimization.',
    content: {
      theory: {
        title: 'Hardware Acceleration Techniques',
        points: [
          'Introduction to GPU programming',
          'Optimization strategies for accelerated computing',
        ],
      },
      code: {
        title: 'GPU Programming',
        description: 'Write GPU-accelerated code using CUDA.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'Hardware Acceleration Quiz',
          description: 'Assess your knowledge of hardware acceleration techniques.',
        },
        coding: {
          title: 'Acceleration Project',
          description: 'Optimize a computation task using GPU acceleration.',
        },
      },
    },
  },
  {
    id: 'week12',
    weekNumber: 12,
    phase: 2,
    title: 'Capstone Two: Multimodal AI System',
    description: 'Create a system integrating NLP and speech recognition.',
    content: {
      theory: {
        title: 'Capstone Integration Overview',
        points: [
          'Review of phase 2 concepts and techniques',
          'Capstone project planning and objectives',
        ],
      },
      code: {
        title: 'Integration Project',
        description: 'Prepare for the capstone by integrating phase 2 concepts.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'Integration Quiz',
          description: 'Test your readiness for the capstone project.',
        },
        coding: {
          title: 'Integration Project',
          description: 'Combine phase 2 techniques into a cohesive project.',
        },
      },
    },
  },
  // Phase 3: Advanced
  {
    id: 'week13',
    weekNumber: 13,
    phase: 3,
    title: 'Time Series Forecasting',
    description: 'RNNs, LSTMs, and GRUs.',
    content: {
      theory: {
        title: 'Time Series Forecasting',
        points: [
          'Introduction to RNNs, LSTMs, and GRUs',
          'Applications of time series forecasting',
        ],
      },
      code: {
        title: 'Time Series Implementation',
        description: 'Implement a time series forecasting model.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'Time Series Quiz',
          description: 'Evaluate your understanding of time series forecasting.',
        },
        coding: {
          title: 'Time Series Project',
          description: 'Develop a time series forecasting application.',
        },
      },
    },
  },
  {
    id: 'week15',
    weekNumber: 15,
    phase: 3,
    title: 'Reinforcement Learning',
    description: 'Q-learning and DQNs.',
    content: {
      theory: {
        title: 'Reinforcement Learning',
        points: [
          'Introduction to Q-learning and DQNs',
          'Applications of reinforcement learning',
        ],
      },
      code: {
        title: 'Reinforcement Learning Implementation',
        description: 'Implement a reinforcement learning model.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'Reinforcement Learning Quiz',
          description: 'Test your understanding of reinforcement learning.',
        },
        coding: {
          title: 'Reinforcement Learning Project',
          description: 'Develop a reinforcement learning application.',
        },
      },
    },
  },
  {
    id: 'week17',
    weekNumber: 17,
    phase: 3,
    title: 'Transfer Learning and Security',
    description: 'Model security and transfer learning.',
    content: {
      theory: {
        title: 'Transfer Learning and Security',
        points: [
          'Introduction to transfer learning',
          'Security considerations in AI models',
        ],
      },
      code: {
        title: 'Transfer Learning Implementation',
        description: 'Apply transfer learning to a new dataset.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'Transfer Learning Quiz',
          description: 'Assess your knowledge of transfer learning and security.',
        },
        coding: {
          title: 'Transfer Learning Project',
          description: 'Implement transfer learning for a security-focused application.',
        },
      },
    },
  },
  {
    id: 'week20',
    weekNumber: 20,
    phase: 3,
    title: 'Autonomous Financial Advisor',
    description: 'Design a system combining LSTM forecasting and DQN decision-making.',
    content: {
      theory: {
        title: 'Financial Forecasting and Decision Making',
        points: [
          'Time series forecasting with LSTMs',
          'Decision-making with reinforcement learning',
        ],
      },
      code: {
        title: 'Financial Advisor Implementation',
        description: 'Develop an autonomous financial advisor using AI techniques.',
        language: 'python',
      },
      practice: {
        quiz: {
          title: 'Financial Advisor Quiz',
          description: 'Test your understanding of financial forecasting and decision-making.',
        },
        coding: {
          title: 'Financial Advisor Project',
          description: 'Create a system that predicts and advises on financial decisions.',
        },
      },
    },
  },
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
