'use client';

// import useMutation dari '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

//import service API
import Api from '@/services/api';

//interface RegisterRequest
interface RegisterRequest {
  full_name?: string;
  username: string;
  email?: string;
  password: string;
}

export const useRegister = () => {
  return useMutation({
    // mutation untuk register
    mutationFn: async (data: RegisterRequest) => {
      //menggunakan service API untuk register
      const response = await Api.post('/register', data);

      //mengembalikan response data
      return response.data;
    },
  });
};
