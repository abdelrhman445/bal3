import { NextResponse } from 'next/server';

// التغيير هنا: بدل middleware خليناها proxy
export function proxy(request) {
  // 1. نجيب التوكن من الكوكيز
  const token = request.cookies.get('token')?.value;

  // 2. نجيب المسار الحالي
  const path = request.nextUrl.pathname;

  // 3. المسارات المحمية
  const isProtectedRoute = path.startsWith('/dashboard') || path.startsWith('/settings');

  // 4. مسارات الزوار
  const isPublicRoute = path === '/login' || path === '/register' || path === '/verify-otp' || path === '/forgot-password';

  // اللوجيك:
  // لو بيحاول يدخل مكان محمي ومعهوش توكن -> اطرده للوجن
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // لو معاه توكن وبيحاول يسجل من جديد -> وّديه للداشبورد
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// السيرفر بيراقب المسارات دي بس
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/settings/:path*', 
    '/login', 
    '/register', 
    '/verify-otp',
    '/forgot-password'
  ]
};