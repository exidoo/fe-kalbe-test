// import useMutation dari '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

// interface untuk request update analisis
export interface AnalysesUpdateRequest {
  id: number;
  code?: string;
  description?: string;
  lead_time?: number;
  parameter_id: number;
  method_id: number;
  sample_type_id: number;
  is_active?: boolean;
}

/**
 * Hook untuk memperbarui data analisis yang sudah ada.
 * Menggunakan useMutation dari React Query.
 */
export const useAnalysesUpdate = () => {
  return useMutation({
    mutationFn: async (data: AnalysesUpdateRequest) => {
      // Ambil token dari cookies
      const token = Cookies.get('token');

      // Ambil ID dari data
      const { id, ...updateData } = data;

      // Kirim data update sebagai JSON ke API
      const response = await Api.put(`/analyses/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });
};
