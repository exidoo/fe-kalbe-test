// import useMutation dari '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

// interface untuk request update analisis
export interface AnalysesUpdateRequest {
  id: number;
  code?: string | null;
  description?: string | null;
  lead_time?: number | null;
  parameter_id?: number | null;
  method_id?: number | null;
  sample_type_id?: number | null;
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
