// import hook useQuery dari '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

// Interface untuk data relasi Parameter
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

// Interface untuk data relasi Method
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

// Interface untuk data relasi Sample Type
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

// Interface untuk data Analisis
export interface Analyses {
  id: number;
  created_by_id?: number | null;
  created_on?: string | null;
  last_updated_by_id?: number | null;
  last_updated_on?: string | null;
  is_active?: boolean | null;
  code?: string | null;
  description?: string | null;
  lead_time?: number | null;
  parameter_id: number;
  method_id: number;
  sample_type_id: number;

  parameter?: Parameter | null;
  method?: Method | null;
  sample_type?: SampleType | null;
}

/**
 * Hook untuk mengambil daftar semua data analisis.
 * Menggunakan useQuery dari React Query.
 */
export const useAnalyses = () => {
  return useQuery<Analyses[], Error>({
    // query key yang unik untuk daftar analisis
    queryKey: ['analyses'],

    // query function untuk mengambil data dari API
    queryFn: async () => {
      // Ambil token dari cookies
      const token = Cookies.get('token');

      // GET data analisis dari API
      const response = await Api.get('/analyses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan data yang sudah di-parse
      return response.data.data as Analyses[];
    },
  });
};
