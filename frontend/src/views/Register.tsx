import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface RegisterProps {
  isModal?: boolean;
  onClose?: () => void;
  onSwitchToLogin?: () => void;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register: React.FC<RegisterProps> = ({ isModal, onClose, onSwitchToLogin }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [isTyping, setIsTyping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const checkPasswordStrength = (password: string) => {
    const strength = {
      score: 0,
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    if (strength.hasMinLength) strength.score++;
    if (strength.hasUpperCase) strength.score++;
    if (strength.hasLowerCase) strength.score++;
    if (strength.hasNumber) strength.score++;
    if (strength.hasSpecialChar) strength.score++;

    return strength;
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character';
    return '';
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsTyping(true);

    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: '' }));

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
      if (formData.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: validateConfirmPassword(value, formData.confirmPassword)
        }));
      }
    }

    if (name === 'confirmPassword') {
      setErrors(prev => ({
        ...prev,
        confirmPassword: validateConfirmPassword(formData.password, value)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: ValidationErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword)
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    // Add form submission logic here
    if (isModal && onClose) {
      onClose();
    }
  };

  const handleGoogleLogin = () => {
    // Add Google OAuth logic here
    if (isModal && onClose) {
      onClose();
    }
  };

  const handleSwitchToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isModal && onSwitchToLogin) {
      onSwitchToLogin();
    }
  };

  const containerClasses = isModal
    ? 'px-8 py-6'
    : 'min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8';

  const formClasses = isModal
    ? ''
    : 'max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg';

  const getPasswordStrengthColor = (score: number) => {
    if (score <= 2) return 'bg-red-500';
    if (score <= 3) return 'bg-yellow-500';
    if (score <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className={containerClasses}>
      <div className={formClasses}>
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Create your account
          </h2>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join our AI learning community
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } ${errors.email ? 'border-red-500' : ''}`}
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => setErrors(prev => ({ ...prev, email: validateEmail(formData.email) }))}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } ${errors.password ? 'border-red-500' : ''}`}
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={() => setErrors(prev => ({ ...prev, password: validatePassword(formData.password) }))}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1"
                >
                  {showPassword ? (
                    <EyeSlashIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <EyeIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Password Strength
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {passwordStrength.score}/5
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-200 rounded-full">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.score)}`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="flex items-center text-xs">
                      {passwordStrength.hasMinLength ? (
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <XCircleIcon className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        8+ Characters
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      {passwordStrength.hasUpperCase ? (
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <XCircleIcon className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Uppercase
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      {passwordStrength.hasLowerCase ? (
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <XCircleIcon className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Lowercase
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      {passwordStrength.hasNumber ? (
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <XCircleIcon className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Number
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      {passwordStrength.hasSpecialChar ? (
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <XCircleIcon className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Special Character
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={() => setErrors(prev => ({ 
                    ...prev, 
                    confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword) 
                  }))}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <EyeIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign up
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
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-500" />
              Sign up with Google
            </button>
          </div>
        </form>

        <p className={`mt-4 text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Already have an account?{' '}
          {isModal ? (
            <button
              onClick={handleSwitchToLogin}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </button>
          ) : (
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default Register;
