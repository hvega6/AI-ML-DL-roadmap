import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import authService from '../services/authService';
import type { RegisterData, LoginData } from '../services/authService';

interface User {
  id: string;
  email: string;
  role: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

interface ApiAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
          try {
            const userData = JSON.parse(storedUser) as User;
            userData.isAdmin = userData.role === 'admin';
            setUser(userData);
            setIsAdmin(userData.isAdmin);
            setIsAuthenticated(true);
          } catch (err) {
            console.error('Error parsing stored user:', err);
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.register(data);
      const userData = response.user as User;
      setUser(userData);
      setIsAdmin(userData.role === 'admin');
      setIsAuthenticated(true);
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.login(data);
      const userData = response.user as User;
      userData.isAdmin = userData.role === 'admin';
      setUser(userData);
      setIsAdmin(userData.role === 'admin');
      setIsAuthenticated(true);
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
      }
      // Navigate to appropriate dashboard based on user role
      if (userData.role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    history.push('/');
  };

  const clearError = () => setError(null);

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    error,
    register,
    login,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
