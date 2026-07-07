import { NextRequest, NextResponse } from 'next/server';

// Middleware ini melakukan pengecekan CEPAT berdasarkan cookie penanda sesi,
// supaya halaman /admin/dashboard tidak sempat "kelihatan" sebelum redirect
// ke halaman login saat user belum login.
//
// PENTING: ini BUKAN pengaman utama. Cookie ini bisa saja dipalsukan oleh
// siapapun karena tidak diverifikasi ke Firebase (itu perlu Firebase Admin
// SDK + service account di server, di luar cakupan perbaikan ini).
// Keamanan data yang sesungguhnya tetap dijaga oleh Firestore Rules dan
// Storage Rules (allow write: if request.auth != null), yang SELALU
// diverifikasi langsung oleh server Firebase, bukan oleh middleware ini.

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin/dashboard')) {
    const hasSession = request.cookies.get('mapur_admin_session');
    if (!hasSession) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
