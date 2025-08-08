'use client';

// src/hooks/methods/useMethodsUpdate.ts

// import useMutation dari '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

// import toast dari 'react-hot-toast'
import toast from 'react-hot-toast';

// Interface untuk data Method
export interface Method {
  id: number;
  created_by_id?: number | null;
  created_on?: string | null;
  last_updated_by_id?: number | null;
  last_updated_on?: string | null;
  is_active?: boolean | null;
  code?: string | null;
  description?: string | null;
}

// Tipe data untuk payload saat mengupdate method
export type UpdateMethodPayload = {
  id: number;
  code?: string;
  description?: string;
  last_updated_by_id?: number;
  is_active?: boolean;
};

/**
 * Hook untuk memperbarui data method yang sudah ada.
 * Menggunakan useMutation dari React Query.
 */
export const useMethodsUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<Method, Error, UpdateMethodPayload>({
    mutationFn: async (updatedMethod) => {
      const token = Cookies.get('token');

      const { id, ...dataToUpdate } = updatedMethod;

      const response = await Api.put(`/methods/${id}`, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data as Method;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['methods'] });
      queryClient.invalidateQueries({ queryKey: ['methods', data.id] });
      toast.success('Metode berhasil diperbarui!');
    },
    onError: (error) => {
      toast.error('Gagal memperbarui metode.');
      console.error(error);
    },
  });
};
