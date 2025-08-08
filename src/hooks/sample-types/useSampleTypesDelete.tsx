'use client';

// src/hooks/sample-types/useSampleTypesDelete.ts

// import useMutation dari '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

// import toast dari 'react-hot-toast'
import toast from 'react-hot-toast';

/**
 * Hook untuk menghapus data tipe sampel berdasarkan ID.
 * Menggunakan useMutation dari React Query.
 */
export const useSampleTypesDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    // mutation function untuk mengirim permintaan DELETE ke API
    mutationFn: async (id: number) => {
      // Ambil token dari cookies
      const token = Cookies.get('token');

      // Kirim permintaan DELETE ke API
      await Api.delete(`/sample-types/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (_, id) => {
      // Invalidate cache untuk query 'sampleTypes' agar daftar tipe sampel terupdate
      queryClient.invalidateQueries({ queryKey: ['sampleTypes'] });
      // Invalidate cache untuk item tipe sampel tunggal yang dihapus
      queryClient.invalidateQueries({ queryKey: ['sampleTypes', id] });

      // Tampilkan notifikasi sukses
      toast.success('Tipe Sampel berhasil dihapus!');
    },
    onError: (error) => {
      // Tampilkan notifikasi error
      toast.error('Gagal menghapus tipe sampel.');
      console.error(error); // Log error untuk debugging
    },
  });
};
