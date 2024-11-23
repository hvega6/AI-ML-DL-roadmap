import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  return (
    <div className={`max-w-4xl mx-auto p-4 ${isDarkMode ? 'bg-gray-900' : ''}`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile</h1>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6`}>
        <div className="space-y-4">
          <div>
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>User ID</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user?.id || 'N/A'}</p>
          </div>
          <div>
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Email</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user?.email || 'N/A'}</p>
          </div>
          <div>
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Role</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user?.role || 'User'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
