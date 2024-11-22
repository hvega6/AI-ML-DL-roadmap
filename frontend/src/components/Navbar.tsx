import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  const navClasses = `fixed top-0 left-0 right-0 z-50 ${
    isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
  } shadow-md`;

  const linkClasses = `flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-opacity-75 transition-colors duration-200 ${
    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
  }`;

  const iconClasses = 'w-5 h-5 mr-2';

  // Redirect to home if not logged in and trying to access protected routes
  React.useEffect(() => {
    if (!user && (location.pathname === '/dashboard' || location.pathname === '/lessons')) {
      history.push('/');
    }
  }, [user, location.pathname, history]);

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Brand and Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {user ? (
                <Link to="/dashboard" className="flex items-center">
                  <AcademicCapIcon className="h-8 w-8 text-blue-500" />
                  <span className="ml-2 text-lg font-bold">AI Learning</span>
                </Link>
              ) : (
                <Link to="/" className="flex items-center">
                  <AcademicCapIcon className="h-8 w-8 text-blue-500" />
                  <span className="ml-2 text-lg font-bold">AI Learning</span>
                </Link>
              )}
            </div>

            {/* Navigation Links */}
            {user && (
              <div className="hidden md:flex items-center ml-8 space-x-4">
                <Link to="/dashboard" className={linkClasses}>
                  <HomeIcon className={iconClasses} />
                  Dashboard
                </Link>
                <Link to="/lessons" className={linkClasses}>
                  <BookOpenIcon className={iconClasses} />
                  Lessons
                </Link>
              </div>
            )}
          </div>

          {/* Right side - Theme Toggle and Auth */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`${linkClasses} p-2`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            
            {user ? (
              <button
                onClick={handleLogout}
                className={`${linkClasses} text-red-500 hover:text-red-600`}
              >
                <ArrowRightOnRectangleIcon className={iconClasses} />
                Logout
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className={`${linkClasses} text-blue-500 hover:text-blue-600`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`${linkClasses} bg-blue-500 text-white hover:bg-blue-600`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
