'use client';

import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

// 1. Definisikan tipe untuk nilai context
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

// 2. Buat context dengan nilai default
// Nilai default ini penting agar tidak terjadi error saat context tidak memiliki Provider
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {}, // Beri fungsi kosong sebagai nilai default
});

// 3. Definisikan tipe props untuk AuthProvider
interface AuthProviderProps {
  children: React.ReactNode;
}

// 4. Perbaiki AuthProvider dengan tipe props yang jelas
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));

  // useEffect untuk memantau perubahan storage tidak diperlukan untuk js-cookie,
  // karena state di atas akan diperbarui saat token diatur atau dihapus.

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>;
};
