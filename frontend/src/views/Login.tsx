import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface LoginProps {
  isModal?: boolean;
  onClose?: () => void;
  onSwitchToRegister?: () => void;
}

interface LocationState {
  from?: { pathname: string };
  returnTo?: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

const Login: React.FC<LoginProps> = ({ isModal, onClose, onSwitchToRegister }) => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { login, user, logout } = useAuth();
  const { isDarkMode } = useTheme();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  // Handle redirection after successful login
  useEffect(() => {
    if (user) {
      // Get the return path from location state or default to dashboard
      const returnPath = location.state?.returnTo;
      const fromPath = location.state?.from?.pathname;
      
      if (isModal && onClose) {
        onClose();
      } else {
        // Priority order for redirection:
        // 1. Specific return path if provided
        // 2. Previous location path if it exists
        // 3. Role-based dashboard as default
        const redirectTo = returnPath || fromPath || (user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
        history.push(redirectTo);
      }
    }
  }, [user, history, location.state, isModal, onClose]);

  // Handle logout redirection
  const handleLogout = async () => {
    try {
      await logout();
      // Get current path before logout
      const currentPath = location.pathname;
      // If logging out from resources page or any other page, redirect to home
      if (currentPath === '/resources' || currentPath !== '/') {
        history.push('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userData = await login(formData);
      console.log('Login successful, user:', userData);
      
      // Get the return path from location state or default to dashboard
      const { from } = location.state as LocationState || { from: { pathname: '/dashboard' } };
      console.log('Redirecting to:', from.pathname);
      
      // Use replace instead of push to avoid breaking the back button
      history.replace(from.pathname);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isModal && onSwitchToRegister) {
      onSwitchToRegister();
    } else {
      // Preserve the return path when switching to register
      const returnPath = location.state?.returnTo;
      history.push('/register', { returnTo: returnPath });
    }
  };

  const containerClasses = isModal
    ? 'px-8 py-6'
    : 'min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8';

  const formClasses = isModal
    ? ''
    : 'max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg';

  return (
    <div className={containerClasses}>
      <div className={formClasses}>
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sign in to your account
          </h2>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Welcome back to our AI learning community
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900'}`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : ''
                }`}
              />
              <label htmlFor="remember-me" className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className={`font-medium ${
                  isDarkMode 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'}`}>
                Or continue with
              </span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleSwitchToRegister}
              className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-500" />
              Create new account
            </button>
          </div>
        </form>

        <p className={`mt-4 text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Don't have an account?{' '}
          {isModal ? (
            <button
              onClick={handleSwitchToRegister}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </button>
          ) : (
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
