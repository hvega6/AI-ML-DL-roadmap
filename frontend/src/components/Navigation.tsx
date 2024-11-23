import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { 
  Bars3Icon as MenuIcon, 
  XMarkIcon as XIcon, 
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  BookmarkIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal';
import Login from '../views/Login';
import Register from '../views/Register';

interface IUser {
  email: string;
  role: 'student' | 'admin';
  preferences: {
    theme: 'light' | 'dark';
  };
}

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const handleCloseModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const switchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const publicNavigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'What We Teach', href: '/curriculum', icon: AcademicCapIcon },
    { name: 'Resources', href: '/resources', icon: BookmarkIcon },
  ];

  const studentNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    { name: 'Lessons', href: '/lessons', icon: BookOpenIcon },
    { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  ];

  const adminNavigation = [
    { name: 'Admin Dashboard', href: '/admin/dashboard', icon: ChartBarIcon },
    { name: 'Manage Lessons', href: '/admin/lessons', icon: BookOpenIcon },
    { name: 'Manage Users', href: '/admin/users', icon: UserCircleIcon },
    { name: 'Settings', href: '/admin/settings', icon: AdjustmentsHorizontalIcon },
  ];

  const getNavigation = () => {
    // Show public navigation for non-logged in users
    if (!user) return publicNavigation;
    
    // Show only specific routes for logged-in users
    const baseNavigation = user.role === 'admin' ? adminNavigation : studentNavigation;
    
    // Add resources to both admin and student navigation
    return [
      ...baseNavigation,
      { name: 'Resources', href: '/resources', icon: BookmarkIcon }
    ];
  };

  const navigation = getNavigation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  // Enhanced secure routes with role-based access
  useEffect(() => {
    if (user) {
      // Only handle protected route access
      if (user.role === 'student' && location.pathname.startsWith('/admin')) {
        console.log('Student attempting to access admin route, redirecting to dashboard');
        history.replace('/dashboard');
        return;
      }

      if (user.role === 'admin' && location.pathname === '/dashboard') {
        console.log('Admin accessing student dashboard, redirecting to admin dashboard');
        history.replace('/admin/dashboard');
        return;
      }
    } else {
      // Only redirect from protected routes
      const protectedPaths = ['/dashboard', '/admin', '/profile'];
      if (protectedPaths.some(path => location.pathname.startsWith(path))) {
        console.log('Unauthenticated user attempting to access protected route');
        history.replace('/login', { 
          returnTo: location.pathname,
          from: location
        });
      }
    }
  }, [user, location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-900'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                AI/ML/DL Roadmap
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.href)
                        ? 'bg-blue-500 text-white'
                        : 'text-white hover:bg-blue-500 hover:text-white'
                    } transition-colors duration-200`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md border ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600 hover:border-gray-500' 
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              } transition-colors duration-200 text-lg`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            
            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
                >
                  Login
                </button>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-500 rounded-md hover:bg-blue-50 dark:bg-gray-700 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-600"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md border ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600 hover:border-gray-500' 
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              } transition-colors duration-200 text-lg`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md border ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600 hover:border-gray-500' 
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              } transition-colors duration-200`}
            >
              {isOpen ? (
                <XIcon className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.href)
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <item.icon className="h-5 w-5 mr-2" />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
          <div className="mt-4 space-y-2 px-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsRegisterModalOpen(true);
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-500 rounded-md hover:bg-blue-50 dark:bg-gray-700 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-600"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={handleCloseModals}>
        <Login 
          isModal={true} 
          onClose={handleCloseModals}
          onSwitchToRegister={switchToRegister}
        />
      </Modal>

      {/* Register Modal */}
      <Modal isOpen={isRegisterModalOpen} onClose={handleCloseModals}>
        <Register 
          isModal={true} 
          onClose={handleCloseModals}
          onSwitchToLogin={switchToLogin}
        />
      </Modal>
    </nav>
  );
};

export default Navigation;