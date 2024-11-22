import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export interface RegisterData {
  username: string;
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
    username: string;
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
      return response.data;
    } catch (error: any) {
      console.error('Registration error details:', error.response?.data);
      const message = error.response?.data?.message || 'Registration failed';
      const errors = error.response?.data?.errors || [];
      throw new Error(errors.length > 0 ? errors[0] : message);
    }
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      const errors = error.response?.data?.errors || [];
      throw new Error(errors.length > 0 ? errors.join(', ') : message);
    }
  },

  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    try {
      const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to refresh token');
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('accessToken');
  },

  getRefreshToken: () => {
    return localStorage.getItem('refreshToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  }
};

export default authService;
