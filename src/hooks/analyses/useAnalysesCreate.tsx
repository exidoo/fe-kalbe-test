// import useMutation dari '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

// interface untuk request data
// Menghilangkan field yang di-generate otomatis oleh server (id, created_on, dll)
export interface AddAnalysesRequest {
  code?: string;
  description?: string;
  lead_time?: number;
  parameter_id: number;
  method_id: number;
  sample_type_id: number;
  created_by_id?: number;
  is_active?: boolean;
}

// useAddAnalyses Hook
export const useAnalysesCreate = () => {
  return useMutation({
    mutationFn: async (data: AddAnalysesRequest) => {
      // Ambil token dari cookies
      const token = Cookies.get('token');

      // POST data sebagai JSON ke API
      const response = await Api.post('/analyses', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });
};
