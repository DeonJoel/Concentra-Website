import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Notice the function is now called 'proxy' instead of 'middleware'
export function proxy(request: NextRequest) {
  // 🚨 DEVELOPER HACK: Bypass security during local UI design
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // Check for our secure cookie (Runs only in Production)
  // Check for our secure cookie
  const token = request.cookies.get('admin_token');

  // If trying to access the dashboard without a token, boot them out to the login screen
  if (request.nextUrl.pathname.startsWith('/hq-command-77x/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/hq-command-77x', request.url));
    }
  }

  return NextResponse.next();
}

// This tells the proxy to ONLY run on dashboard routes to save server resources
export const config = {
  matcher: ['/hq-command-77x/dashboard/:path*'],
};