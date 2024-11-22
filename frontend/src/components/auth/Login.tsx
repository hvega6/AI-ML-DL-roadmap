import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface LoginProps {
  isModal?: boolean;
  onClose?: () => void;
  onSwitchToRegister?: () => void;
}

const Login: React.FC<LoginProps> = ({ isModal, onClose, onSwitchToRegister }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login, isAdmin } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const response = await login(formData);
      
      if (response?.user?.role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('/dashboard');
      }

      if (isModal && onClose) {
        onClose();
      }
    } catch (err: any) {
      let errorMessage = 'Failed to login';
      if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const containerClasses = `p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} ${
    isModal ? 'rounded-lg shadow-xl' : 'min-h-screen'
  }`;

  const inputClasses = `w-full p-3 rounded border ${
    isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white'
      : 'bg-gray-50 border-gray-300 text-gray-900'
  } focus:outline-none focus:ring-2 focus:ring-blue-500`;

  const buttonClasses = `w-full py-3 px-4 rounded font-semibold ${
    loading
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-blue-600 hover:bg-blue-700 text-white'
  } transition duration-200`;

  const linkClasses = `text-blue-600 hover:text-blue-800 ${
    isDarkMode ? 'text-blue-400 hover:text-blue-300' : ''
  }`;

  return (
    <div className={containerClasses}>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Login to Your Account</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClasses}
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={inputClasses}
              disabled={loading}
            />
          </div>
          <button type="submit" className={buttonClasses} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {!isModal && (
          <div className="mt-4 text-center">
            <p>
              Don't have an account?{' '}
              <button onClick={onSwitchToRegister} className={linkClasses}>
                Register here
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
