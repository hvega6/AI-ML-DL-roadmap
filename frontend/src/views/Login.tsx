import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface LoginProps {
  isModal?: boolean;
  onClose?: () => void;
  onSwitchToRegister?: () => void;
}

const Login: React.FC<LoginProps> = ({ isModal, onClose, onSwitchToRegister }) => {
  const { login, error: authError, clearError } = useAuth();
  const { isDarkMode } = useTheme();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login({ email, password, rememberMe });
      if (isModal && onClose) {
        onClose();
      }
      history.replace('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const containerClasses = isModal
    ? 'px-6 py-4'
    : 'min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8';

  const formClasses = isModal
    ? 'w-full'
    : 'max-w-md w-full space-y-8';

  return (
    <div className={containerClasses}>
      <div className={formClasses}>
        <div>
          <h2 className={`text-center text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome Back
          </h2>
          <p className={`mt-2 text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Sign in to continue your learning journey
          </p>
        </div>

        {(error || authError) && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm" role="alert">
            <span className="block sm:inline">{error || authError}</span>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ${
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
                    ? 'text-indigo-400 hover:text-indigo-300' 
                    : 'text-indigo-600 hover:text-indigo-500'
                }`}
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                transition-colors duration-200
                ${isLoading 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
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

          <div className="text-center mt-4">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              {isModal && onSwitchToRegister ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onSwitchToRegister();
                  }}
                  className={`font-medium ${
                    isDarkMode 
                      ? 'text-indigo-400 hover:text-indigo-300' 
                      : 'text-indigo-600 hover:text-indigo-500'
                  }`}
                >
                  Sign up
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Add your modal open logic here
                  }}
                  className={`font-medium ${
                    isDarkMode 
                      ? 'text-indigo-400 hover:text-indigo-300' 
                      : 'text-indigo-600 hover:text-indigo-500'
                  }`}
                >
                  Sign up
                </button>
              )}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
