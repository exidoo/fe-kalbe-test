'use client';

// src/hooks/methods/useMethodsCreate.ts

// import useMutation dari '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

// import toast dari 'react-hot-toast'
import toast from 'react-hot-toast';

// interface untuk request data
// Menghilangkan field yang di-generate otomatis oleh server
export interface AddMethodRequest {
  code?: string;
  description?: string;
  created_by_id?: number;
  is_active?: boolean;
}

// useMethodsCreate Hook
export const useMethodsCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddMethodRequest) => {
      const token = Cookies.get('token');

      const response = await Api.post('/methods', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    onSuccess: () => {
      // Invalidate cache untuk query 'methods' agar daftar metode otomatis terupdate
      queryClient.invalidateQueries({ queryKey: ['methods'] });
      // Tampilkan notifikasi sukses menggunakan react-hot-toast
      toast.success('Metode berhasil ditambahkan!');
    },
    onError: (error) => {
      // Tampilkan notifikasi error menggunakan react-hot-toast
      toast.error(`Gagal menambahkan metode.`);
      console.error(error); // Log error untuk debugging
    },
  });
};
