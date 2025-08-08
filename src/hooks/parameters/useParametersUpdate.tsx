'use client';

// import useMutation dari '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

// import toast dari 'react-hot-toast'
import toast from 'react-hot-toast';

// Interface untuk data Parameter
export interface Parameter {
  id: number;
  created_by_id?: number | null;
  created_on?: string | null;
  last_updated_by_id?: number | null;
  last_updated_on?: string | null;
  is_active?: boolean | null;
  code?: string | null;
  description?: string | null;
}

// Tipe data untuk payload saat mengupdate parameter
// ID disertakan untuk identifikasi, dan properti lain bersifat opsional
export type UpdateParameterPayload = {
  id: number;
  code?: string;
  description?: string;
  last_updated_by_id?: number;
  is_active?: boolean;
};

/**
 * Hook untuk memperbarui data parameter yang sudah ada.
 * Menggunakan useMutation dari React Query.
 */
export const useParametersUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<Parameter, Error, UpdateParameterPayload>({
    // mutation function untuk mengirim data update ke API
    mutationFn: async (updatedParameter) => {
      // Ambil token dari cookies
      const token = Cookies.get('token');

      // Ambil ID dari payload dan hapus dari objek data
      const { id, ...dataToUpdate } = updatedParameter;

      // PUT data update ke API
      const response = await Api.put(`/parameters/${id}`, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan data yang sudah di-parse
      return response.data.data as Parameter;
    },
    onSuccess: (data) => {
      // Invalidate cache untuk query 'parameters' agar daftar parameter terupdate
      queryClient.invalidateQueries({ queryKey: ['parameters'] });

      // Invalidate cache untuk item parameter tunggal yang diupdate
      queryClient.invalidateQueries({ queryKey: ['parameters', data.id] });

      // Tampilkan notifikasi sukses
      toast.success('Parameter berhasil diperbarui!');
    },
    onError: (error) => {
      // Tampilkan notifikasi error
      toast.error('Gagal memperbarui parameter.');
      console.error(error); // Log error untuk debugging
    },
  });
};
