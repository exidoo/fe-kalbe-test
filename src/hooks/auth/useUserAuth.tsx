// src/hooks/useAuthUser.ts
'use client';

//import Js Cookie
import Cookies from 'js-cookie';

//interface User
interface User {
  id: number;
  full_name?: string;
  username: string;
  email?: string;
}

export const useAuthUser = (): User | null => {
  try {
    const user = Cookies.get('user');
    return user ? (JSON.parse(user) as User) : null;
  } catch (error) {
    console.error('Failed to parse user from cookie:', error);
    return null;
  }
};
