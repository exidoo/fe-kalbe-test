'use client';

// src/hooks/sample-types/useSampleTypesUpdate.ts

// import useMutation dari '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

// import toast dari 'react-hot-toast'
import toast from 'react-hot-toast';

// Interface untuk data SampleType
export interface SampleType {
  id: number;
  created_by_id?: number | null;
  created_on?: string | null;
  last_updated_by_id?: number | null;
  last_updated_on?: string | null;
  is_active?: boolean | null;
  code?: string | null;
  description?: string | null;
}

// Tipe data untuk payload saat mengupdate tipe sampel
export type UpdateSampleTypePayload = {
  id: number;
  code?: string;
  description?: string;
  last_updated_by_id?: number;
  is_active?: boolean;
};

/**
 * Hook untuk memperbarui data tipe sampel yang sudah ada.
 * Menggunakan useMutation dari React Query.
 */
export const useSampleTypesUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<SampleType, Error, UpdateSampleTypePayload>({
    mutationFn: async (updatedSampleType) => {
      const token = Cookies.get('token');

      const { id, ...dataToUpdate } = updatedSampleType;

      const response = await Api.put(`/samples/${id}`, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data as SampleType;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['sampleTypes'] });
      queryClient.invalidateQueries({ queryKey: ['sampleTypes', data.id] });
      toast.success('Tipe Sampel berhasil diperbarui!');
    },
    onError: (error) => {
      toast.error('Gagal memperbarui tipe sampel.');
      console.error(error);
    },
  });
};
