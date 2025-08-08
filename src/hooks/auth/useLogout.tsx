// src/hooks/useLogout.ts
'use client';

// import hook react
import { useContext } from 'react';

// import js-cookie
import Cookies from 'js-cookie';

// import useRouter dari 'next/navigation' untuk navigasi
import { useRouter } from 'next/navigation';

// import context
import { AuthContext } from '@/context/AuthContext';

// custom hook useLogout
export const useLogout = (): (() => void) => {
  // Ambil setIsAuthenticated dari context
  const authContext = useContext(AuthContext);

  // Gunakan null assertion karena kita yakin AuthContext akan selalu tersedia
  const { setIsAuthenticated } = authContext!;

  // Inisialisasi router
  const router = useRouter();

  // Fungsi logout
  const logout = (): void => {
    // Hapus token dan user dari cookie
    Cookies.remove('token');
    Cookies.remove('user');

    // Ubah status autentikasi menjadi false
    setIsAuthenticated(false);

    // Arahkan ke halaman login
    router.push('/login');
  };

  return logout;
};
