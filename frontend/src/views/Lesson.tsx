import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  BookOpenIcon, 
  CodeBracketIcon, 
  AcademicCapIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { curriculum } from '../data/curriculum';
import { Lesson as LessonType } from '../types/lessons';

interface Tab {
  name: string;
  icon: React.ReactNode;
}

const Lesson: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('theory');
  const [code, setCode] = useState('# Write your Python code here\n\n');
  const [currentLesson, setCurrentLesson] = useState<LessonType | null>(null);

  useEffect(() => {
    const lesson = curriculum.lessons.find(l => l.id === id);
    setCurrentLesson(lesson || null);
  }, [id]);

  const tabs: Tab[] = [
    {
      name: 'theory',
      icon: <BookOpenIcon className="h-5 w-5" />,
    },
    {
      name: 'quiz',
      icon: <AcademicCapIcon className="h-5 w-5" />,
    },
    {
      name: 'practice',
      icon: <CodeBracketIcon className="h-5 w-5" />,
    },
  ];

  const navigateToLesson = (direction: 'prev' | 'next') => {
    const currentIndex = curriculum.lessons.findIndex(l => l.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < curriculum.lessons.length) {
      history.push(`/lesson/${curriculum.lessons[newIndex].id}`);
    }
  };

  if (!currentLesson) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'} flex items-center justify-center`}>
        <div className={`text-center ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
          <h2 className="text-2xl font-bold mb-4">Lesson not found</h2>
          <Link to="/lessons" className="text-blue-500 hover:text-blue-600">
            Return to Lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
      {/* Lesson Header */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                {currentLesson.title}
              </h1>
              <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                Phase {currentLesson.phase} - Week {currentLesson.weekNumber}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigateToLesson('prev')}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
                disabled={curriculum.lessons[0].id === id}
              >
                <ChevronLeftIcon className={`h-6 w-6 ${curriculum.lessons[0].id === id ? 'opacity-50' : ''}`} />
              </button>
              <button
                onClick={() => navigateToLesson('next')}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
                disabled={curriculum.lessons[curriculum.lessons.length - 1].id === id}
              >
                <ChevronRightIcon className={`h-6 w-6 ${curriculum.lessons[curriculum.lessons.length - 1].id === id ? 'opacity-50' : ''}`} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === tab.name
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-900'
                    : isDarkMode
                      ? 'text-gray-400 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
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
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentLesson.content.theory.title}
            </h2>
            <ul className="space-y-4">
              {currentLesson.content.theory.points.map((point, index) => (
                <li key={index} className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="mr-2">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6`}>
            <div className="mb-4">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {currentLesson.content.code.title}
              </h2>
              <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {currentLesson.content.code.description}
              </p>
            </div>
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full h-64 p-4 font-mono text-sm rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-900 text-gray-300 border-gray-700'
                    : 'bg-gray-50 text-gray-900 border-gray-200'
                } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              <button
                className={`absolute bottom-4 right-4 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-900'
                }`}
              >
                <PlayIcon className="h-5 w-5" />
                <span>Run Code</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentLesson.content.practice.quiz.title}
            </h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentLesson.content.practice.quiz.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lesson;
