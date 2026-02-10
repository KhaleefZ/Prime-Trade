import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/api/tasks') || 
                          pathname.startsWith('/api/user/profile') || 
                          pathname.startsWith('/api/stats');
  
  const isAuthRoute = pathname === '/login' || pathname === '/register' || pathname === '/';

  let isValid = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
      await jwtVerify(token, secret);
      isValid = true;
    } catch (e) {
      console.error('Middleware Auth Error:', e);
      isValid = false;
    }
  }

  if (isProtectedRoute) {
    if (!isValid) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (isAuthRoute && isValid) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/tasks/:path*', '/api/user/profile', '/api/stats', '/login', '/register'],
};
