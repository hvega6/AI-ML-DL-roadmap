import React, { useState, useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BookOpenIcon, ChartBarIcon, BeakerIcon, CpuChipIcon, AcademicCapIcon, CloudIcon, CogIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

// Images are in src/public or src/public/images
const getImagePath = (weekNumber: number | string) => {
  try {
    // In production, assets should be in the public directory
    return `/${weekNumber}.png`;
  } catch {
    // Fallback to images subdirectory
    return `/images/${weekNumber}.png`;
  }
};

const Curriculum: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const topics = [
    // Phase 1
    {
      title: "Introduction to AI, ML, and DL",
      description: "Understanding AI fundamentals and their real-world applications",
      icon: <BookOpenIcon className="w-6 h-6" />,
      date: "Phase 1 - Week 1",
      weekNumber: 1,
    },
    {
      title: "Machine Learning Workflows",
      description: "ML pipeline steps and learning types",
      icon: <ChartBarIcon className="w-6 h-6" />,
      date: "Phase 1 - Week 2",
      weekNumber: 2,
    },
    {
      title: "Neural Networks for Image Classification",
      description: "Understanding neural networks and CNNs",
      icon: <CogIcon className="w-6 h-6" />,
      date: "Phase 1 - Week 3",
      weekNumber: 3,
    },
    {
      title: "Data Augmentation",
      description: "Techniques for model generalization",
      icon: <BeakerIcon className="w-6 h-6" />,
      date: "Phase 1 - Week 4",
      weekNumber: 4,
    },
    {
      title: "Training Basics",
      description: "Neural network training fundamentals",
      icon: <AcademicCapIcon className="w-6 h-6" />,
      date: "Phase 1 - Week 5",
      weekNumber: 5,
    },
    {
      title: "Capstone One: Image Classification Pipeline",
      description: "Build a CNN pipeline to classify CIFAR-10 images",
      icon: <CpuChipIcon className="w-6 h-6" />,
      date: "Phase 1 - Week 6",
      weekNumber: 6,
    },
    // Phase 2
    {
      title: "Natural Language Processing (NLP) Basics",
      description: "Text preprocessing and applications",
      icon: <BookOpenIcon className="w-6 h-6" />,
      date: "Phase 2 - Week 1",
      weekNumber: 7,
    },
    {
      title: "Advanced NLP Models",
      description: "Transformer models and transfer learning",
      icon: <CloudIcon className="w-6 h-6" />,
      date: "Phase 2 - Week 2",
      weekNumber: 8,
    },
    {
      title: "Speech Recognition",
      description: "Audio processing and feature extraction",
      icon: <BeakerIcon className="w-6 h-6" />,
      date: "Phase 2 - Week 3",
      weekNumber: 9,
    },
    {
      title: "Robotics and Motion Planning",
      description: "Robotics fundamentals and pathfinding",
      icon: <CogIcon className="w-6 h-6" />,
      date: "Phase 2 - Week 4",
      weekNumber: 10,
    },
    {
      title: "Hardware Acceleration",
      description: "GPU programming and optimization",
      icon: <CpuChipIcon className="w-6 h-6" />,
      date: "Phase 2 - Week 5",
      weekNumber: 11,
    },
    {
      title: "Capstone Two: Multimodal AI System",
      description: "Create a system integrating NLP and speech recognition",
      icon: <AcademicCapIcon className="w-6 h-6" />,
      date: "Phase 2 - Week 6",
      weekNumber: 12,
    },
    // Phase 3
    {
      title: "Time Series Forecasting",
      description: "RNNs, LSTMs, and GRUs",
      icon: <ChartBarIcon className="w-6 h-6" />,
      date: "Phase 3 - Week 1",
      weekNumber: 13,
    },
    {
      title: "Reinforcement Learning",
      description: "Q-learning and DQNs",
      icon: <CogIcon className="w-6 h-6" />,
      date: "Phase 3 - Week 2",
      weekNumber: 14,
    },
    {
      title: "Transfer Learning and Security",
      description: "Model security and transfer learning",
      icon: <CloudIcon className="w-6 h-6" />,
      date: "Phase 3 - Week 3",
      weekNumber: 15,
    },
    {
      title: "Capstone Three: Autonomous Financial Advisor",
      description: "Design a system combining LSTM forecasting and DQN decision-making",
      icon: <CogIcon className="w-6 h-6" />,
      date: "Phase 3 - Week 4",
      weekNumber: 16,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI/ML/DL Curriculum
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A comprehensive journey through AI, Machine Learning, and Deep Learning
          </p>
        </div>

        <VerticalTimeline>
          {topics.map((topic, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element"
              contentStyle={{ 
                background: 'rgb(33, 150, 243)', 
                color: '#fff',
                padding: '2rem'
              }}
              contentArrowStyle={{ borderRight: '7px solid rgb(33, 150, 243)' }}
              date={topic.date}
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={topic.icon}
            >
              <h3 className="vertical-timeline-element-title text-xl font-bold mb-4">
                {topic.title}
              </h3>
              <p className="mb-4">{topic.description}</p>
              
              <div className="mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <img 
                    src={getImagePath(topic.weekNumber)}
                    alt={`Content for ${topic.title}`}
                    className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (!img.src.includes('/images/')) {
                        img.src = new URL(`/src/public/images/${topic.weekNumber}.png`, import.meta.url).href;
                      }
                    }}
                  />
                </div>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        } bg-blue-500 hover:bg-blue-600 text-white`}
        style={{ zIndex: 1000 }}
        aria-label="Scroll to top"
      >
        <ArrowUpIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Curriculum;
