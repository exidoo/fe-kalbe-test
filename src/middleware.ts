// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Tentukan rute yang dapat diakses tanpa autentikasi (public routes)
const publicRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  // Ambil token dari cookies permintaan
  const isAuthenticated = request.cookies.has('token');

  const { pathname } = request.nextUrl;

  // 1. Jika pengguna tidak terautentikasi dan mencoba mengakses rute yang dilindungi
  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    // Redirect ke halaman login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Jika pengguna sudah terautentikasi dan mencoba mengakses rute login/register
  if (isAuthenticated && publicRoutes.includes(pathname)) {
    // Redirect ke halaman utama (home) atau rute lain yang dilindungi
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Lanjutkan ke halaman yang diminta jika tidak ada kondisi yang terpenuhi
  return NextResponse.next();
}

// Konfigurasi matcher untuk menentukan rute mana yang akan menjalankan middleware
// Ini memastikan middleware tidak berjalan pada file statis atau API
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
