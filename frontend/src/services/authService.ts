import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

// Add auth header to requests
axios.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = authService.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${API_URL}/refresh-token`, {
          refreshToken
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        authService.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: {
    id: string;
    email: string;
    role?: string;
  };
  accessToken: string;
  refreshToken: string;
}

const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_URL}/register`, data);
      const { accessToken, refreshToken } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data);
      const message = error.response?.data?.message || 'Registration failed';
      const errors = error.response?.data?.errors || [];
      throw new Error(errors.length > 0 ? errors[0] : message);
    }
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      const { accessToken, refreshToken } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      const errors = error.response?.data?.errors || [];
      throw new Error(errors.length > 0 ? errors.join(', ') : message);
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  getCurrentUser: () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return null;

      const decoded = jwtDecode<{ userId: string; email: string; role: string }>(token);
      return {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };
    } catch (error) {
      return null;
    }
  },

  getToken: () => localStorage.getItem('accessToken'),

  getRefreshToken: () => localStorage.getItem('refreshToken'),

  isAuthenticated: () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
};

export default authService;
