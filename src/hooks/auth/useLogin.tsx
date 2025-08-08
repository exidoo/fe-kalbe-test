'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// interface LoginRequest
interface LoginRequest {
  username: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    // mutation untuk login
    mutationFn: async (data: LoginRequest) => {
      try {
        const response = await Api.post('/login', data);

        return response.data;
      } catch (error: any) {
        // Tangani error dari Axios atau fetch
        const message = error.response?.data?.message || error.message || 'Terjadi kesalahan saat menghubungi server.';
        throw new Error(message);
      }
    },
  });
};
