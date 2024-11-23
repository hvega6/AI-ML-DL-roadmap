import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface RegisterProps {
  isModal?: boolean;
  onClose?: () => void;
  onSwitchToLogin?: () => void;
}

const Register: React.FC<RegisterProps> = ({ isModal, onClose, onSwitchToLogin }) => {
  const history = useHistory();
  const { register } = useAuth();
  const { isDarkMode } = useTheme();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validationMessages, setValidationMessages] = useState({
    length: '',
    lowercase: '',
    uppercase: '',
    number: '',
    special: '',
    match: ''
  });

  const validatePassword = (password: string) => {
    let strength = 0;
    const validations = {
      length: password.length >= 8,
      lowercase: /[a-z]+/.test(password),
      uppercase: /[A-Z]+/.test(password),
      number: /[0-9]+/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]+/.test(password)
    };

    // Update validation messages
    setValidationMessages({
      length: validations.length ? '' : 'Password must be at least 8 characters',
      lowercase: validations.lowercase ? '' : 'Password must include a lowercase letter',
      uppercase: validations.uppercase ? '' : 'Password must include an uppercase letter',
      number: validations.number ? '' : 'Password must include a number',
      special: validations.special ? '' : 'Password must include a special character',
      match: formData.confirmPassword && formData.password !== formData.confirmPassword 
        ? 'Passwords do not match' 
        : ''
    });

    if (validations.length) strength += 20;
    if (validations.lowercase) strength += 20;
    if (validations.uppercase) strength += 20;
    if (validations.number) strength += 20;
    if (validations.special) strength += 20;

    return strength;
  };

  useEffect(() => {
    setPasswordStrength(validatePassword(formData.password));
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check if passwords match first
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Get all validation messages that aren't empty
    const activeValidationMessages = Object.values(validationMessages).filter(msg => msg);
    if (activeValidationMessages.length > 0) {
      setError(activeValidationMessages[0]);
      return;
    }

    if (passwordStrength < 100) {
      setError('Password does not meet all requirements');
      return;
    }

    setIsLoading(true);

    try {
      const response = await register(formData);
      console.log('Registration successful:', response);
      
      // Clear form data
      setFormData({
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      if (isModal) {
        if (onSwitchToLogin) {
          onSwitchToLogin();
        }
        if (onClose) {
          onClose();
        }
      } else {
        history.push('/login');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed');
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
            Create an Account
          </h2>
          <p className={`mt-2 text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join our learning platform today
          </p>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm" role="alert">
            <span className="block sm:inline">{error}</span>
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
              value={formData.email}
              onChange={handleChange}
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
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Create your password"
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
            
            {/* Password Strength Bar */}
            <div className="mt-2">
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    passwordStrength <= 20
                      ? 'bg-red-500'
                      : passwordStrength <= 40
                      ? 'bg-yellow-500'
                      : passwordStrength <= 60
                      ? 'bg-yellow-400'
                      : passwordStrength <= 80
                      ? 'bg-indigo-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
              <div className={`mt-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <p className="mb-2 font-medium">Password must contain:</p>
                <div className="grid grid-cols-3 gap-x-2 gap-y-2">
                  <div 
                    className={`flex items-center transition-colors duration-200 ${
                      formData.password.length >= 8 ? 'text-green-500' : ''
                    }`}
                    title={validationMessages.length}
                  >
                    <span className="mr-2">{formData.password.length >= 8 ? '✓' : '○'}</span>
                    8+ characters
                  </div>
                  <div 
                    className={`flex items-center transition-colors duration-200 ${
                      /[a-z]/.test(formData.password) ? 'text-green-500' : ''
                    }`}
                    title={validationMessages.lowercase}
                  >
                    <span className="mr-2">{/[a-z]/.test(formData.password) ? '✓' : '○'}</span>
                    Lowercase
                  </div>
                  <div 
                    className={`flex items-center transition-colors duration-200 ${
                      /[A-Z]/.test(formData.password) ? 'text-green-500' : ''
                    }`}
                    title={validationMessages.uppercase}
                  >
                    <span className="mr-2">{/[A-Z]/.test(formData.password) ? '✓' : '○'}</span>
                    Uppercase
                  </div>
                  <div 
                    className={`flex items-center transition-colors duration-200 ${
                      /[0-9]/.test(formData.password) ? 'text-green-500' : ''
                    }`}
                    title={validationMessages.number}
                  >
                    <span className="mr-2">{/[0-9]/.test(formData.password) ? '✓' : '○'}</span>
                    At least 1 Number
                  </div>
                  <div 
                    className={`flex items-center transition-colors duration-200 ${
                      /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-500' : ''
                    }`}
                    title={validationMessages.special}
                  >
                    <span className="mr-2">{/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? '✓' : '○'}</span>
                    1 Special Character
                  </div>
                  <div 
                    className={`flex items-center transition-colors duration-200 ${
                      formData.confirmPassword && formData.password === formData.confirmPassword ? 'text-green-500' : ''
                    }`}
                    title={validationMessages.match}
                  >
                    <span className="mr-2">
                      {formData.confirmPassword && formData.password === formData.confirmPassword ? '✓' : '○'}
                    </span>
                    Match
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="text-center">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className={`font-medium ${
                  isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'
                }`}
              >
                Sign in
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
