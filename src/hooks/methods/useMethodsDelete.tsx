'use client';

// src/hooks/methods/useMethodsDelete.ts

// import useMutation dari '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

// import toast dari 'react-hot-toast'
import toast from 'react-hot-toast';

/**
 * Hook untuk menghapus data method berdasarkan ID.
 * Menggunakan useMutation dari React Query.
 */
export const useMethodsDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    // mutation function untuk mengirim permintaan DELETE ke API
    mutationFn: async (id: number) => {
      // Ambil token dari cookies
      const token = Cookies.get('token');

      // Kirim permintaan DELETE ke API
      await Api.delete(`/methods/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (_, id) => {
      // Invalidate cache untuk query 'methods' agar daftar metode terupdate
      queryClient.invalidateQueries({ queryKey: ['methods'] });
      // Invalidate cache untuk item method tunggal yang dihapus
      queryClient.invalidateQueries({ queryKey: ['methods', id] });

      // Tampilkan notifikasi sukses
      toast.success('Metode berhasil dihapus!');
    },
    onError: (error) => {
      // Tampilkan notifikasi error
      toast.error('Gagal menghapus metode.');
      console.error(error); // Log error untuk debugging
    },
  });
};
