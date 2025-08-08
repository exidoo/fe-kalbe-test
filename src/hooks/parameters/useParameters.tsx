// src/hooks/parameters/useParameters.ts
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
 * Hook untuk mengambil daftar semua data parameter.
 * Menggunakan useQuery dari React Query.
 */
export const useParameters = () => {
  return useQuery<Parameter[], Error>({
    // query key yang unik untuk daftar parameter
    queryKey: ['parameters'],

    // query function untuk mengambil data dari API
    queryFn: async () => {
      // Ambil token dari cookies
      const token = Cookies.get('token');

      // GET data parameter dari API
      const response = await Api.get('/parameters', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan data yang sudah di-parse
      return response.data.data as Parameter[];
    },
  });
};
