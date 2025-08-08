// import useMutation dari '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query';

// import service API
import Api from '@/services/api';

// import js-cookie
import Cookies from 'js-cookie';

/**
 * Hook untuk menghapus data analisis.
 * Menggunakan useMutation dari React Query.
 */
export const useAnalysesDelete = () => {
  return useMutation({
    // mutation function untuk menghapus analisis
    mutationFn: async (id: number) => {
      // Ambil token dari cookies untuk otentikasi
      const token = Cookies.get('token');

      // Kirim request DELETE ke API dengan ID analisis
      const response = await Api.delete(`/analyses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });
};
