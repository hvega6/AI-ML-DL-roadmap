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
  rememberMe: boolean;
}

export interface AuthResponse {
  message?: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
  token?: string;
  accessToken?: string;
  refreshToken?: string;
}

const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/register`, data);
    const { token, refreshToken } = response.data;
    if (token) {
      localStorage.setItem('accessToken', token);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/login`, data);
    const { token, refreshToken } = response.data;
    if (token) {
      localStorage.setItem('accessToken', token);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('accessToken');
  },

  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },

  getRefreshToken: () => {
    return localStorage.getItem('refreshToken');
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
    const { accessToken, newRefreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return response.data;
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        authService.logout();
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
};

export default authService;
