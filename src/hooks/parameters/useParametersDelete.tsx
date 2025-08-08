'use client';

// import useMutation dari '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

// import toast dari 'react-hot-toast'
import toast from 'react-hot-toast';

/**
 * Hook untuk menghapus data parameter berdasarkan ID.
 * Menggunakan useMutation dari React Query.
 */
export const useParametersDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    // mutation function untuk mengirim permintaan DELETE ke API
    mutationFn: async (id: number) => {
      // Ambil token dari cookies
      const token = Cookies.get('token');

      // Kirim permintaan DELETE ke API
      await Api.delete(`/parameters/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (_, id) => {
      // Invalidate cache untuk query 'parameters' agar daftar parameter terupdate
      queryClient.invalidateQueries({ queryKey: ['parameters'] });
      // Invalidate cache untuk item parameter tunggal yang dihapus
      queryClient.invalidateQueries({ queryKey: ['parameters', id] });

      // Tampilkan notifikasi sukses
      toast.success('Parameter berhasil dihapus!');
    },
    onError: (error) => {
      // Tampilkan notifikasi error
      toast.error('Gagal menghapus parameter.');
      console.error(error); // Log error untuk debugging
    },
  });
};
