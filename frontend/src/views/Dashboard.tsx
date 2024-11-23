import React, { useState, useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import authService from '../services/authService';
import axios from 'axios';
import {
  FireIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';

// Register all Chart.js components
Chart.register(...registerables);

interface UserProgress {
  lessonsCompleted: number;
  totalLessons: number;
  timeSpentLearning: number;
  skillProgress: { [key: string]: number };
  currentStreak: number;
  coursesCompleted: number;
  totalCourses: number;
}

const Dashboard: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Refs for chart canvases
  const lessonChartRef = useRef<HTMLCanvasElement>(null);
  const skillChartRef = useRef<HTMLCanvasElement>(null);
  const timeChartRef = useRef<HTMLCanvasElement>(null);

  // Chart instances
  const [lessonChart, setLessonChart] = useState<Chart | null>(null);
  const [skillChart, setSkillChart] = useState<Chart | null>(null);
  const [timeChart, setTimeChart] = useState<Chart | null>(null);

  const { user } = useAuth();
  const [fantasyName, setFantasyName] = useState<string>('');

  useEffect(() => {
    fetchUserProgress();
  }, []);

  const fetchUserProgress = async () => {
    try {
      console.log('Fetching user progress...');
      // Mock data for development if backend is not ready
      const mockProgress: UserProgress = {
        lessonsCompleted: 15,
        totalLessons: 50,
        timeSpentLearning: 42,
        skillProgress: {
          'Python': 75,
          'Machine Learning': 60,
          'Deep Learning': 45,
          'Data Science': 55
        },
        currentStreak: 7,
        coursesCompleted: 3,
        totalCourses: 10
      };

      // Uncomment this when backend is ready
      // const response = await axios.get('/api/user/progress', {
      //   headers: { 
      //     'Authorization': `Bearer ${authService.getToken()}` 
      //   }
      // });

      // setUserProgress(response.data);
      setUserProgress(mockProgress);
      console.log('User progress fetched:', mockProgress);
    } catch (error) {
      console.error('Error fetching user progress:', error);
      setError('Failed to fetch user progress');
    }
  };

  // Create chart configurations
  const createChartConfig = (
    type: ChartConfiguration['type'],
    data: ChartConfiguration['data'],
    options?: ChartConfiguration['options']
  ): ChartConfiguration => ({
    type,
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: data.datasets[0].label || 'Chart',
          color: isDarkMode ? '#FFFFFF' : '#000000'
        },
        legend: {
          labels: {
            color: isDarkMode ? '#FFFFFF' : '#000000'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: isDarkMode ? '#FFFFFF' : '#000000'
          },
          grid: {
            color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }
        },
        y: {
          ticks: {
            color: isDarkMode ? '#FFFFFF' : '#000000'
          },
          grid: {
            color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }
        }
      },
      ...options
    }
  });

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

  // Create and update charts when user progress changes
  useEffect(() => {
    if (!userProgress) return;

    console.log('Creating charts...');

    // Lesson Completion Chart
    if (lessonChartRef.current) {
      const ctx = lessonChartRef.current.getContext('2d');
      if (ctx) {
        // Destroy existing chart if it exists
        if (lessonChart) lessonChart.destroy();

        const newLessonChart = new Chart(ctx, createChartConfig(
          'doughnut',
          {
            labels: ['Completed', 'Remaining'],
            datasets: [{
              label: 'Lesson Completion',
              data: [
                userProgress.lessonsCompleted,
                userProgress.totalLessons - userProgress.lessonsCompleted
              ],
              backgroundColor: [
                isDarkMode ? '#10B981' : '#3B82F6',
                isDarkMode ? '#6366F1' : '#93C5FD'
              ]
            }]
          }
        ));
        setLessonChart(newLessonChart);
        console.log('Lesson chart created');
      }
    }

    // Skill Progress Chart
    if (skillChartRef.current) {
      const ctx = skillChartRef.current.getContext('2d');
      if (ctx) {
        // Destroy existing chart if it exists
        if (skillChart) skillChart.destroy();

        const newSkillChart = new Chart(ctx, createChartConfig(
          'bar',
          {
            labels: Object.keys(userProgress.skillProgress),
            datasets: [{
              label: 'Skill Proficiency',
              data: Object.values(userProgress.skillProgress),
              backgroundColor: isDarkMode ? '#10B981' : '#3B82F6'
            }]
          }
        ));
        setSkillChart(newSkillChart);
        console.log('Skill chart created');
      }
    }

    // Learning Time Chart
    if (timeChartRef.current) {
      const ctx = timeChartRef.current.getContext('2d');
      if (ctx) {
        // Destroy existing chart if it exists
        if (timeChart) timeChart.destroy();

        const newTimeChart = new Chart(ctx, createChartConfig(
          'line',
          {
            labels: ['Total Learning Time'],
            datasets: [{
              label: 'Hours Spent Learning',
              data: [userProgress.timeSpentLearning],
              borderColor: isDarkMode ? '#10B981' : '#3B82F6',
              backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'
            }]
          }
        ));
        setTimeChart(newTimeChart);
        console.log('Time chart created');
      }
    }
  }, [userProgress, isDarkMode]);

  const generateFantasyName = async () => {
    try {
      const response = await fetch('https://fantasyname.lukewh.com/');
      if (!response.ok) throw new Error('Failed to fetch fantasy name');
      const name = await response.text();
      const trimmedName = name.trim();
      setFantasyName(trimmedName);
      localStorage.setItem('fantasyName', trimmedName);
    } catch (error) {
      console.error('Error generating fantasy name:', error);
      const fallbackNames = ['Brave Warrior', 'Wise Scholar', 'Curious Explorer', 'Code Mage', 'Digital Knight'];
      const fallbackName = fallbackNames[Math.floor(Math.random() * fallbackNames.length)];
      setFantasyName(fallbackName);
      localStorage.setItem('fantasyName', fallbackName);
    }
  };

  if (error) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8 flex items-center justify-center`}>
        <div className={`text-center p-6 rounded-lg ${isDarkMode ? 'bg-red-900 text-white' : 'bg-red-100 text-red-900'}`}>
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8`}>
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Your Adventurer name is, <span className="font-semibold">{fantasyName || 'Adventurer'}</span>! Your learning quest awaits.
            </p>
            <button
              onClick={generateFantasyName}
              className="inline-flex items-center p-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              title="Generate new name"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Track your progress and continue your learning journey
          </p>
        </div>

        {userProgress ? (
          <>
            {/* Quick Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {/* Streak */}
              <div className={`p-4 rounded-lg shadow-md flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <FireIcon className={`h-10 w-10 mr-4 ${isDarkMode ? 'text-orange-500' : 'text-orange-600'}`} />
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Current Streak</p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {userProgress.currentStreak} Days
                  </p>
                </div>
              </div>

              {/* Courses Completed */}
              <div className={`p-4 rounded-lg shadow-md flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <AcademicCapIcon className={`h-10 w-10 mr-4 ${isDarkMode ? 'text-green-500' : 'text-green-600'}`} />
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Courses Completed</p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {userProgress.coursesCompleted}/{userProgress.totalCourses}
                  </p>
                </div>
              </div>

              {/* Total Learning Time */}
              <div className={`p-4 rounded-lg shadow-md flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <ClockIcon className={`h-10 w-10 mr-4 ${isDarkMode ? 'text-blue-500' : 'text-blue-600'}`} />
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Learning Time</p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {userProgress.timeSpentLearning} hrs
                  </p>
                </div>
              </div>

              {/* Lessons Completed */}
              <div className={`p-4 rounded-lg shadow-md flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CheckCircleIcon className={`h-10 w-10 mr-4 ${isDarkMode ? 'text-purple-500' : 'text-purple-600'}`} />
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Lessons Completed</p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {userProgress.lessonsCompleted}/{userProgress.totalLessons}
                  </p>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Lesson Completion Chart */}
              <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="h-64">
                  <canvas ref={lessonChartRef}></canvas>
                </div>
              </div>

              {/* Skill Progress Chart */}
              <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="h-64">
                  <canvas ref={skillChartRef}></canvas>
                </div>
              </div>

              {/* Learning Time Chart */}
              <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="h-64">
                  <canvas ref={timeChartRef}></canvas>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 text-center">
              <Link
                to="/lessons"
                className={`px-6 py-3 rounded-lg ${isDarkMode
                    ? 'bg-blue-700 hover:bg-blue-800 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } transition-colors duration-200`}
              >
                View All Lessons
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className={`${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
              Loading user progress...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
