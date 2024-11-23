import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { RegisterData } from '../../services/authService';

interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const Register: React.FC<RegisterFormProps> = ({ onSuccess, onError }) => {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async ({ email, password }: RegisterData) => {
    try {
      setIsLoading(true);
      await register({ email, password });
      onSuccess?.();
    } catch (error: any) {
      onError?.(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return null; // This component is just for handling registration logic
};

export default Register;