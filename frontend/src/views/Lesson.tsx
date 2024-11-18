import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  BookOpenIcon, 
  CodeBracketIcon, 
  AcademicCapIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

interface Tab {
  name: string;
  icon: React.ReactNode;
}

const Lesson: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('theory');
  const [code, setCode] = useState('# Write your Python code here\n\n');

  const tabs: Tab[] = [
    {
      name: 'theory',
      icon: <BookOpenIcon className="h-5 w-5" />,
    },
    {
      name: 'practice',
      icon: <CodeBracketIcon className="h-5 w-5" />,
    },
    {
      name: 'quiz',
      icon: <AcademicCapIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
      {/* Lesson Header */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                Neural Networks Fundamentals
              </h1>
              <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                Lesson 3 of 12
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                className={`p-2 rounded-full ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-blue-600'
                } hover:opacity-80 transition-opacity`}
                aria-label="Previous lesson"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                className={`p-2 rounded-full ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-blue-600'
                } hover:opacity-80 transition-opacity`}
                aria-label="Next lesson"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === tab.name
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.icon}
                <span className="capitalize">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'theory' && (
          <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
            <div className={`p-6 rounded-lg shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h2>Introduction to Neural Networks</h2>
              <p>
                Neural networks are computing systems inspired by the biological neural networks 
                that constitute animal brains. They are designed to recognize patterns and are 
                particularly effective for tasks like image and speech recognition.
              </p>
              <div className="my-8">
                <img 
                  src="/path/to/neural-network-diagram.svg" 
                  alt="Neural Network Architecture"
                  className="w-full max-w-2xl mx-auto"
                />
              </div>
              <h3>Key Components</h3>
              <ul>
                <li>Neurons (nodes)</li>
                <li>Weights and biases</li>
                <li>Activation functions</li>
                <li>Layers (input, hidden, output)</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className={`rounded-lg shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-blue-900'
              }`}>Code Practice</h2>
              <button
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors duration-200`}
              >
                <PlayIcon className="h-5 w-5 mr-2" />
                Run Code
              </button>
            </div>
            <div className={`font-mono p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full h-64 bg-transparent outline-none ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-800'
                }`}
              />
            </div>
            <div className={`mt-4 p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
              <h3 className={`text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Output</h3>
              <pre className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>
                # Code output will appear here
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className={`rounded-lg shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-6`}>
            <h2 className={`text-xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-blue-900'
            }`}>Knowledge Check</h2>
            <div className="space-y-6">
              <div>
                <p className={`mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  What is the primary purpose of an activation function in a neural network?
                </p>
                <div className="space-y-2">
                  {['Introduce non-linearity', 'Store weights', 'Calculate loss', 'Update biases'].map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                        isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lesson;
