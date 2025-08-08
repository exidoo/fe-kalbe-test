'use client';

// import FC dari react
import type { FC, FormEvent } from 'react';
import { useState } from 'react';

//import hook useRouter dari 'next/navigation'
import { useRouter } from 'next/navigation';

//import custom hook useRegister dari hooks
import { useRegister } from '@/hooks/auth/useRegister';

//interface for validation errors
interface ValidationErrors {
  [key: string]: string;
}

const Register: FC = () => {
  // Inisialisasi router
  const router = useRouter();

  // Inisialisasi useRegister
  const { mutate, isPending } = useRegister();

  // define state
  const [fullName, setFullName] = useState<string>(''); // Mengubah 'name' menjadi 'fullName'
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // define state for errors
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Handle submit form
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    // Call the register mutation
    mutate(
      {
        full_name: fullName, // Sesuaikan dengan skema BE
        username,
        email,
        password,
      },
      {
        onSuccess: () => {
          // Redirect to login page
          router.push('/login');
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          // Solusi: Ambil errors dengan aman, jika tidak ada, gunakan objek kosong
          setErrors(error.response?.data?.errors || {});

          // Anda juga bisa menambahkan penanganan untuk error umum di sini
        },
      }
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-[100vh] w-[100vw] grid place-items-center">
      <form onSubmit={handleRegister} className="w-full max-w-sm">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Your full name"
            required
          />
          {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Username"
            required
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="your@mail.com"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600" required />
          </div>
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            I agree with the{' '}
            <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
              terms and conditions
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full text-white bg-[#353535]  hover:bg-[#4d4c4c]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isPending ? 'Registering...' : 'Register new account'}
        </button>
      </form>
    </div>
  );
};

export default Register;
