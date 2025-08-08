// src/hooks/analyses/useParametersById.ts
'use client';

// import hook useQuery dari '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

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

/**
 * Hook untuk mengambil data parameter tunggal berdasarkan ID.
 * @param id ID dari parameter yang akan diambil.
 */
export const useParametersById = (id: number) => {
  return useQuery<Parameter, Error>({
    // query key yang unik untuk setiap ID
    queryKey: ['parameters', id],

    // query function untuk mengambil data dari API
    queryFn: async () => {
      // Ambil token dari cookies
      const token = Cookies.get('token');

      // Ambil data parameter berdasarkan ID dari API
      const response = await Api.get(`/parameters/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan data yang sudah di-parse
      return response.data.data as Parameter;
    },
  });
};
