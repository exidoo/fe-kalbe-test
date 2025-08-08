'use client';

// src/hooks/sample-types/useSampleTypesCreate.ts

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
export interface AddSampleTypeRequest {
  code?: string;
  description?: string;
  created_by_id?: number;
  is_active?: boolean;
}

// useSampleTypesCreate Hook
export const useSampleTypesCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddSampleTypeRequest) => {
      const token = Cookies.get('token');

      const response = await Api.post('/sample-types', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    onSuccess: () => {
      // Invalidate cache untuk query 'sampleTypes' agar daftar tipe sampel otomatis terupdate
      queryClient.invalidateQueries({ queryKey: ['sampleTypes'] });
      // Tampilkan notifikasi sukses menggunakan react-hot-toast
      toast.success('Tipe Sampel berhasil ditambahkan!');
    },
    onError: (error) => {
      // Tampilkan notifikasi error menggunakan react-hot-toast
      toast.error(`Gagal menambahkan tipe sampel.`);
      console.error(error); // Log error untuk debugging
    },
  });
};
