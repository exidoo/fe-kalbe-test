'use client';

// import useMutation dan useQueryClient dari '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

// import toast dari 'react-hot-toast'
import toast from 'react-hot-toast';

// interface untuk request data
export interface AddAnalysesRequest {
  code?: string;
  description?: string;
  lead_time?: number;
  parameter_id: number;
  method_id: number;
  sample_type_id: number;
  created_by_id?: number;
  is_active?: boolean;
}

// useAnalysesCreate Hook
export const useAnalysesCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddAnalysesRequest) => {
      // Ambil token dari cookies
      const token = Cookies.get('token');

      // POST data sebagai JSON ke API
      const response = await Api.post('/analyses', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    onSuccess: () => {
      // Invalidate cache untuk query 'analyses' agar daftar analisis terupdate
      queryClient.invalidateQueries({ queryKey: ['analyses'] });
      // Tampilkan notifikasi sukses
      toast.success('Data analisis berhasil ditambahkan!');
    },
    onError: (error) => {
      // Tampilkan notifikasi error
      toast.error('Gagal menambahkan data analisis.');
      console.error(error);
    },
  });
};
