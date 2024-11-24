import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {
  UsersIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
  Cog6ToothIcon as CogIcon
} from '@heroicons/react/24/outline';

const AdminDashboard: React.FC = () => {
  const { isDarkMode } = useTheme();

  const adminLinks = [
    {
      title: 'Users Management',
      path: '/admin/users',
      icon: UsersIcon,
      description: 'Manage user accounts, roles, and permissions'
    },
    {
      title: 'Courses Management',
      path: '/admin/courses',
      icon: BookOpenIcon,
      description: 'Create and manage learning courses'
    },
    {
      title: 'Lessons Management',
      path: '/admin/lessons',
      icon: AcademicCapIcon,
      description: 'Create and organize course lessons'
    },
    {
      title: 'Platform Settings',
      path: '/admin/settings',
      icon: CogIcon,
      description: 'Configure platform settings and preferences'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className={`p-5 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
              <div className="flex items-center">
                <ChartBarIcon className="h-6 w-6 text-blue-500" />
                <span className="ml-2 text-lg font-semibold">Total Users</span>
              </div>
              <p className="mt-2 text-2xl font-bold">0</p>
            </div>
            {/* Add more stat cards as needed */}
          </div>

          {/* Admin Links */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`p-6 rounded-lg transition-transform transform hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex items-center">
                  <link.icon className="h-6 w-6 text-blue-500" />
                  <h3 className="ml-3 text-xl font-semibold">{link.title}</h3>
                </div>
                <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {link.description}
                </p>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow'} p-6`}>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No recent activity to display.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
