'use client';

// src/hooks/methods/useMethods.ts

// import hook useQuery dari '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

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

/**
 * Hook untuk mengambil daftar semua data method.
 * Menggunakan useQuery dari React Query.
 */
export const useMethods = () => {
  return useQuery<Method[], Error>({
    // query key yang unik untuk daftar method
    queryKey: ['methods'],

    // query function untuk mengambil data dari API
    queryFn: async () => {
      // Ambil token dari cookies
      const token = Cookies.get('token');

      // GET data method dari API
      const response = await Api.get('/methods', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan data yang sudah di-parse
      return response.data.data as Method[];
    },
  });
};
