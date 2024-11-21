import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bars3Icon as MenuIcon, 
  XMarkIcon as XIcon, 
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import Modal from './Modal';
import Login from '../views/Login';
import Register from '../views/Register';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Lessons', href: '/lessons', icon: BookOpenIcon },
    { name: 'What We Teach', href: '/curriculum', icon: AcademicCapIcon },
    { name: 'Resources', href: '/resources', icon: BookmarkIcon },
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
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
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <Login 
          isModal={true} 
          onClose={() => setIsLoginModalOpen(false)}
          onSwitchToRegister={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
        />
      </Modal>

      {/* Register Modal */}
      <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)}>
        <Register 
          isModal={true} 
          onClose={() => setIsRegisterModalOpen(false)}
          onSwitchToLogin={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      </Modal>
    </nav>
  );
};

export default Navigation;
