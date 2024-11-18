import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  ChartBarIcon, 
  ClockIcon, 
  AcademicCapIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

interface CourseProgress {
  name: string;
  status: 'completed' | 'in-progress' | 'locked';
  lastAccessed: string;
  progress: number;
}

const Dashboard: React.FC = () => {
  const { isDarkMode } = useTheme();

  const recentCourses: CourseProgress[] = [
    {
      name: 'Neural Networks',
      status: 'completed',
      lastAccessed: '2 days ago',
      progress: 100
    },
    {
      name: 'Deep Learning Fundamentals',
      status: 'in-progress',
      lastAccessed: '1 day ago',
      progress: 60
    },
    {
      name: 'Computer Vision',
      status: 'locked',
      lastAccessed: '-',
      progress: 0
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
            Welcome back, User!
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`}>
            Continue your learning journey
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Overall Progress */}
          <div className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${
                isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
              }`}>
                <ChartBarIcon className={`h-6 w-6 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <span className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-blue-600'
              }`}>50%</span>
            </div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Overall Progress</h3>
          </div>

          {/* Time Spent */}
          <div className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${
                isDarkMode ? 'bg-green-900' : 'bg-green-100'
              }`}>
                <ClockIcon className={`h-6 w-6 ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`} />
              </div>
              <span className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-green-600'
              }`}>24h</span>
            </div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Time Spent</h3>
          </div>

          {/* Completed Courses */}
          <div className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${
                isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
              }`}>
                <AcademicCapIcon className={`h-6 w-6 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`} />
              </div>
              <span className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-purple-600'
              }`}>3</span>
            </div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Completed Courses</h3>
          </div>

          {/* Streak */}
          <div className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${
                isDarkMode ? 'bg-yellow-900' : 'bg-yellow-100'
              }`}>
                <BoltIcon className={`h-6 w-6 ${
                  isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`} />
              </div>
              <span className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-yellow-600'
              }`}>5</span>
            </div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Day Streak</h3>
          </div>
        </div>

        {/* Recent Courses */}
        <div className={`rounded-lg shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } p-6 mb-8`}>
          <h2 className={`text-xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-blue-900'
          }`}>Recent Courses</h2>
          <div className="space-y-4">
            {recentCourses.map((course, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-blue-900'
                    }`}>{course.name}</h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-blue-600'
                    }`}>Last accessed: {course.lastAccessed}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{course.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Learning Button */}
        <Link
          to="/lesson/next"
          className={`inline-flex items-center px-6 py-3 text-base font-medium rounded-md ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          } transition-colors duration-200`}
        >
          Continue Learning
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
