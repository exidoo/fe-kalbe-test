'use client';

// src/hooks/sample-types/useSampleTypesById.ts

// import hook useQuery dari '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

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

/**
 * Hook untuk mengambil data tipe sampel tunggal berdasarkan ID.
 * @param id ID dari tipe sampel yang akan diambil.
 */
export const useSampleTypesById = (id: number) => {
  return useQuery<SampleType, Error>({
    // query key yang unik untuk setiap ID
    queryKey: ['sampleTypes', id],

    // query function untuk mengambil data dari API
    queryFn: async () => {
      // Ambil token dari cookies
      const token = Cookies.get('token');

      // Ambil data tipe sampel berdasarkan ID dari API
      const response = await Api.get(`/sample-types/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan data yang sudah di-parse
      return response.data.data as SampleType;
    },
  });
};
