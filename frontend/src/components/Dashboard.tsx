import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

interface Progress {
  completedLessons: string[];
  currentLesson: string | null;
  quizScores: {
    quizId: string;
    score: number;
    dateTaken: Date;
  }[];
}

interface Lesson {
  _id: string;
  title: string;
  description: string;
  order: number;
  difficulty: string;
  estimatedTime: number;
}

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [fantasyName, setFantasyName] = useState<string>('');

  // Combined useEffect for initial data loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch lessons and progress
        const [lessonsData, progressData] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/lessons`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/progress/${user?.id}`)
        ]);

        setLessons(lessonsData.data);
        setProgress(progressData.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user) {
      fetchData();
    }
  }, [user, isAuthenticated]);

  const generateFantasyName = async () => {
    try {
      const response = await fetch('https://fantasyname.lukewh.com/');
      if (!response.ok) throw new Error('Failed to fetch fantasy name');
      const name = await response.text();
      const trimmedName = name.trim();
      setFantasyName(trimmedName);
      localStorage.setItem('fantasyName', trimmedName);
      return trimmedName;
    } catch (error) {
      console.error('Error generating fantasy name:', error);
      const fallbackNames = ['Brave Warrior', 'Wise Scholar', 'Curious Explorer', 'Code Mage', 'Digital Knight'];
      const fallbackName = fallbackNames[Math.floor(Math.random() * fallbackNames.length)];
      setFantasyName(fallbackName);
      localStorage.setItem('fantasyName', fallbackName);
      return fallbackName;
    }
  };

  // Separate useEffect for fantasy name
  useEffect(() => {
    const loadFantasyName = async () => {
      const savedName = localStorage.getItem('fantasyName');
      if (savedName) {
        setFantasyName(savedName);
      } else {
        await generateFantasyName();
      }
    };
    
    loadFantasyName();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h2>
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Error loading dashboard</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const completedLessonsCount = progress?.completedLessons.length || 0;
  const totalLessons = lessons.length;
  const completionPercentage = totalLessons > 0
    ? Math.round((completedLessonsCount / totalLessons) * 100)
    : 0;

  const averageQuizScore = progress?.quizScores.length
    ? Math.round(
      progress.quizScores.reduce((acc, curr) => acc + curr.score, 0) /
      progress.quizScores.length
    )
    : 0;

  const nextLesson = progress?.currentLesson
    ? lessons.find(lesson => lesson._id === progress.currentLesson)
    : lessons[0];

  return (
    <div className={`min-h-screen py-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome back, {user?.email}!</h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Greetings, <span className="font-semibold">{fantasyName || 'Adventurer'}</span>! Your learning quest awaits.
            </p>
            <button
              onClick={generateFantasyName}
              className="inline-flex items-center p-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              title="Generate new name"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Track your progress and continue your learning journey
          </p>
        </div>
        
        {/* Progress Overview */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Course Progress</h3>
              <ChartBarIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-200 text-blue-600">
                    {completionPercentage}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${completionPercentage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {completedLessonsCount} of {totalLessons} lessons completed
              </p>
            </div>
          </div>

          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Quiz Performance</h3>
              <TrophyIcon className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">{averageQuizScore}%</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Average quiz score ({progress?.quizScores.length || 0} quizzes taken)
            </p>
          </div>

          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Next Up</h3>
              <BookOpenIcon className="h-6 w-6 text-green-500" />
            </div>
            {nextLesson ? (
              <>
                <h4 className="font-medium mb-2">{nextLesson.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {nextLesson.description}
                </p>
                <Link
                  to={`/lessons/${nextLesson._id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Continue Learning
                </Link>
              </>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No lessons available at the moment
              </p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`p-6 rounded-lg shadow-lg mb-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
          {progress?.quizScores.length ? (
            <div className="space-y-4">
              {progress.quizScores.slice(-5).reverse().map((quiz, index) => {
                const lesson = lessons.find(l => l._id === quiz.quizId);
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${quiz.score >= 70 ? 'bg-green-100' : 'bg-yellow-100'
                          }`}
                      >
                        {quiz.score >= 70 ? (
                          <CheckCircleIcon className="h-6 w-6 text-green-600" />
                        ) : (
                          <ClockIcon className="h-6 w-6 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{lesson?.title || 'Unknown Lesson'}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Quiz Score: {quiz.score}%
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(quiz.dateTaken).toLocaleDateString()}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link
            to="/lessons"
            className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'
              } hover:shadow-xl transition-shadow duration-200`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-blue-100">
                <BookOpenIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Browse Lessons</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Explore our comprehensive lesson library
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/resources"
            className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'
              } hover:shadow-xl transition-shadow duration-200`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-green-100">
                <AcademicCapIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Learning Resources</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Access additional learning materials
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
