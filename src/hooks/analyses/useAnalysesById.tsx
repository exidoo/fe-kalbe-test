// import hook useQuery from react-query
import { useQuery } from '@tanstack/react-query';

// import Api helper
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

  // Ganti 'any' dengan interface yang spesifik
  parameter?: Parameter | null;
  method?: Method | null;
  sample_type?: SampleType | null;
}

/**
 * Hook untuk mengambil data analisis tunggal berdasarkan ID.
 * @param id ID dari analisis yang akan diambil.
 */
export const useAnalysesById = (id: number) => {
  return useQuery<Analyses, Error>({
    // query key yang unik untuk setiap ID
    queryKey: ['analyses', id],

    // query function untuk mengambil data dari API
    queryFn: async () => {
      // Ambil token dari cookies
      const token = Cookies.get('token');

      // Ambil data analisis berdasarkan ID dari API
      const response = await Api.get(`/analyses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan data yang sudah di-parse
      return response.data.data as Analyses;
    },
  });
};
