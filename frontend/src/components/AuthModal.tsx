import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Modal from './Modal';
import type { RegisterData, LoginData } from '../services/authService';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  view: 'login' | 'register';
  onSwitchView: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  view, 
  onSwitchView 
}) => {
  const { isDarkMode } = useTheme();
  const initialFormState = {
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  };

  const [formData, setFormData] = useState<RegisterData & { confirmPassword: string; rememberMe: boolean }>(initialFormState);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { login, register } = useAuth();

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;
    return strength;
  };

  const getStrengthColor = (strength: number): string => {
    if (strength <= 20) return 'bg-red-500';
    if (strength <= 40) return 'bg-orange-500';
    if (strength <= 60) return 'bg-yellow-500';
    if (strength <= 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.email) {
      newErrors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push('Email is invalid');
    }

    if (!formData.password) {
      newErrors.push('Password is required');
    } else if (formData.password.length < 8) {
      newErrors.push('Password must be at least 8 characters');
    }

    if (view === 'register' && formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match');
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors([]);

    try {
      if (view === 'login') {
        await login({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe
        });
      } else {
        await register({
          email: formData.email,
          password: formData.password
        });
      }
      onClose();
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'An error occurred']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={`px-4 py-5 sm:p-6 max-w-md w-full mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className={`text-2xl font-semibold text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {view === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className={`mt-2 text-sm text-center ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {view === 'login' 
              ? 'Sign in to access your learning journey' 
              : 'Start your learning journey today'}
          </p>
        </div>

        {errors.length > 0 && (
          <div className="mt-4">
            <div className="rounded-md bg-red-50 p-3">
              <div className="flex">
                <div className="ml-2">
                  <h3 className="text-sm font-medium text-red-800">
                    There {errors.length === 1 ? 'was an error' : 'were errors'} with your submission
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc space-y-1 pl-4">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
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
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full pr-10 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                  placeholder={view === 'login' ? 'Enter your password' : 'Create a password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-500'
                  }`}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {view === 'register' && (
                <div className="mt-1">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor(calculatePasswordStrength(formData.password))} transition-all duration-300`}
                      style={{ width: `${calculatePasswordStrength(formData.password)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {view === 'register' && (
              <>
                <div className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="text-sm font-medium mb-2">
                    Password Requirements:
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="space-y-1">
                      <div className={`flex items-center ${formData.password.length >= 8 ? (isDarkMode ? 'text-green-400' : 'text-green-600') : ''}`}>
                        <span className="mr-2">{formData.password.length >= 8 ? '✓' : '○'}</span>
                        8+ characters
                      </div>
                      <div className={`flex items-center ${/[a-z]/.test(formData.password) ? (isDarkMode ? 'text-green-400' : 'text-green-600') : ''}`}>
                        <span className="mr-2">{/[a-z]/.test(formData.password) ? '✓' : '○'}</span>
                        Lowercase
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className={`flex items-center ${/[A-Z]/.test(formData.password) ? (isDarkMode ? 'text-green-400' : 'text-green-600') : ''}`}>
                        <span className="mr-2">{/[A-Z]/.test(formData.password) ? '✓' : '○'}</span>
                        Uppercase
                      </div>
                      <div className={`flex items-center ${/\d/.test(formData.password) ? (isDarkMode ? 'text-green-400' : 'text-green-600') : ''}`}>
                        <span className="mr-2">{/\d/.test(formData.password) ? '✓' : '○'}</span>
                        Number
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className={`flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? (isDarkMode ? 'text-green-400' : 'text-green-600') : ''}`}>
                        <span className="mr-2">{/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? '✓' : '○'}</span>
                        Special char
                      </div>
                      <div className={`flex items-center ${formData.password === formData.confirmPassword && formData.password.length > 0 ? (isDarkMode ? 'text-green-400' : 'text-green-600') : ''}`}>
                        <span className="mr-2">{formData.password === formData.confirmPassword && formData.password.length > 0 ? '✓' : '○'}</span>
                        Passwords match
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label 
                    htmlFor="confirmPassword" 
                    className={`block text-sm font-medium ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`appearance-none block w-full pr-10 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'border-gray-300 text-gray-900'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                        isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-500'
                      }`}
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            {view === 'login' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : ''
                    }`}
                  />
                  <label 
                    htmlFor="rememberMe" 
                    className={`ml-2 block text-sm ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a 
                    href="#" 
                    className={`font-medium ${
                      isDarkMode 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-500'
                    }`}
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading 
                ? 'Processing...' 
                : view === 'login' 
                  ? 'Sign in' 
                  : 'Create account'
              }
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${
                  isDarkMode ? 'border-gray-600' : 'border-gray-300'
                }`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${
                  isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'
                }`}>
                  {view === 'login' ? 'New to our platform?' : 'Already have an account?'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={onSwitchView}
                className={`w-full inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-200 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {view === 'login' ? 'Create an account' : 'Sign in to your account'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AuthModal;
