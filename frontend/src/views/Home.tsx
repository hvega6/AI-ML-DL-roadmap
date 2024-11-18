import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, AcademicCapIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { Feature } from '../types';
import Modal from '../components/Modal';
import Register from './Register';
import Login from './Login';

const Home: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const features: Feature[] = [
    {
      title: 'Machine Learning Fundamentals',
      description: 'Learn the core concepts of ML including supervised learning, unsupervised learning, and model evaluation.'
    },
    {
      title: 'Deep Learning & Neural Networks',
      description: 'Master neural networks, deep learning frameworks, and advanced architectures.'
    },
    {
      title: 'AI Applications',
      description: 'Build real-world AI applications in computer vision, NLP, and reinforcement learning.'
    }
  ];

  return (
    <>
      {/* Navigation */}
      <nav className={`${isDarkMode ? 'bg-gray-900' : 'bg-blue-600'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-primary-400' : 'text-white'}`}>AI/ML/DL Roadmap</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className={`inline-flex items-center px-1 pt-1 text-sm ${isDarkMode ? 'text-gray-300 hover:text-primary-400' : 'text-white hover:text-blue-100'}`}>
                  <HomeIcon className="h-3.5 w-3.5 mr-1" />
                  Home
                </Link>
                <Link to="/curriculum" className={`inline-flex items-center px-1 pt-1 text-sm ${isDarkMode ? 'text-gray-300 hover:text-primary-400' : 'text-white hover:text-blue-100'}`}>
                  <AcademicCapIcon className="h-3.5 w-3.5 mr-1" />
                  What We Teach
                </Link>
                <Link to="/resources" className={`inline-flex items-center px-1 pt-1 text-sm ${isDarkMode ? 'text-gray-300 hover:text-primary-400' : 'text-white hover:text-blue-100'}`}>
                  <BookOpenIcon className="h-3.5 w-3.5 mr-1" />
                  Resources
                </Link>
              </div>
            </div>
            {/* Theme Toggle and Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-md ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-primary-400' 
                    : 'text-white hover:text-blue-100'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <MoonIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-primary-400' 
                    : 'text-white hover:text-blue-100'
                } transition-colors duration-200`}
              >
                Login
              </button>
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`relative ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-900 to-gray-800' 
          : 'bg-gradient-to-r from-blue-800 to-blue-900'
      } overflow-hidden`}>
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${
            isDarkMode 
              ? 'from-primary-900 to-gray-900' 
              : 'from-blue-700 to-blue-900'
          } mix-blend-multiply`} />
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOHM4LjA1OSAxOCAxOHM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xNC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNHMtNi4yNjggMTQtMTQgMTR6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')]" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Master AI, ML & Deep Learning
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl">
            Your comprehensive learning platform for Artificial Intelligence, Machine Learning, and Deep Learning. Start your journey from basics to advanced concepts with structured learning paths.
          </p>
          <div className="mt-10 flex space-x-4">
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                isDarkMode 
                  ? 'text-gray-300 bg-gray-800 hover:bg-gray-700' 
                  : 'text-white bg-blue-700 hover:bg-blue-600'
              } transition-colors duration-200`}
            >
              Start Learning
            </button>
            <Link to="/curriculum" className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800 transition-colors duration-200">
              View Curriculum
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl font-extrabold ${
              isDarkMode ? 'text-white' : 'text-blue-900'
            }`}>
              What You'll Learn
            </h2>
            <p className={`mt-4 text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-blue-600'
            }`}>
              Comprehensive curriculum covering the most in-demand AI and ML skills
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className={`flow-root ${
                    isDarkMode 
                      ? 'bg-gray-900 border-gray-700' 
                      : 'bg-white/50 border-blue-200'
                    } rounded-lg px-6 pb-8 h-full border shadow-lg`}>
                    <div className="-mt-6">
                      <h3 className={`mt-8 text-lg font-medium ${
                        isDarkMode ? 'text-white' : 'text-blue-900'
                      } tracking-tight`}>
                        {feature.title}
                      </h3>
                      <p className={`mt-5 text-base ${
                        isDarkMode ? 'text-gray-400' : 'text-blue-700'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)}>
        <Register 
          isModal 
          onClose={() => setIsRegisterModalOpen(false)} 
          onSwitchToLogin={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      </Modal>

      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <Login 
          isModal 
          onClose={() => setIsLoginModalOpen(false)} 
          onSwitchToRegister={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
