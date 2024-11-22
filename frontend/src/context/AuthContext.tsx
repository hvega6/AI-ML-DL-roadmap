import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../services/authService';

interface User {
  id: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (data: { email: string; password: string }) => Promise<any>;
  login: (data: { email: string; password: string }) => Promise<any>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('accessToken');
    if (token) {
      const user = authService.getCurrentUser();
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const register = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Registering user:', data.email);
      const response = await authService.register(data);
      
      // Store tokens
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Update state
      setUser(response.user);
      setIsAuthenticated(true);
      
      console.log('Registration successful:', response.user.email);
      return response;
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Logging in user:', data.email);
      const response = await authService.login(data);
      
      // Store tokens
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Update state
      setUser(response.user);
      setIsAuthenticated(true);
      
      console.log('Login successful:', response.user.email);
      return response;
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    history.push('/login');
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        register,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
