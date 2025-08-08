'use client';

// import FC dari react
import type { FC, FormEvent } from 'react';
import { useState, useContext } from 'react';

//import hook useRouter dari 'next/navigation'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

//import custom hook useLogin dari hooks
import { useLogin } from '@/hooks/auth/useLogin';

//import js-cookie
import Cookies from 'js-cookie';

//import context
import { AuthContext } from '@/context/AuthContext';

//interface for validation errors
interface ValidationErrors {
  [key: string]: string;
}

export const Login: FC = () => {
  // Inisialisasi router
  const router = useRouter();

  // Inisialisasi useLogin
  const { mutate, isPending } = useLogin();

  // Destruct auth context "setIsAuthenticated"
  const { setIsAuthenticated } = useContext(AuthContext)!;

  // define state
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // define state for errors
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [generalError, setGeneralError] = useState<string>('');

  // Handle submit form
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // Call the login mutation
    mutate(
      {
        username,
        password,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
          // set token to cookie
          Cookies.set('token', data.data.token);

          // set user to cookie (FIXED: ambil dari data.data.user)
          Cookies.set('user', JSON.stringify(data.data.user));

          // set isAuthenticated to true
          setIsAuthenticated(true);

          // Redirect to dashboard page
          router.push('/dashboard');
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          const responseData = error?.response?.data;

          // Tangani pesan umum (misal: Invalid password, User not found)
          setGeneralError(responseData?.message || 'Username atau Password yang dimasukan salah');

          // Hapus error field jika tidak ada validasi field yang dikirim
          setErrors({});
        },
      }
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center w-[100vw] px-4 md:px-0">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">Sign in to your account</h1>
        {generalError && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">{generalError}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="yourusername"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button type="submit" disabled={isPending} className="w-full text-white bg-[#353535]  hover:bg-[#4d4c4c]  cursor-pointer  font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50">
            {isPending ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don&apos;t have an account yet?
            <Link href="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500 ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
