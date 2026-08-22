import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting: Max 5 login attempts per 60 seconds per IP
    const limiter = rateLimit(request, 5, 60 * 1000);
    if (!limiter.success) {
      return NextResponse.json(
        { success: false, error: 'Too many login attempts. Please wait 60 seconds.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    const { password } = await request.json();
    const adminSecret = process.env.ADMIN_SECRET;

    // 2. Strict Security: Reject if ADMIN_SECRET is not configured in .env
    if (!adminSecret) {
      console.error('Security Alert: ADMIN_SECRET environment variable is missing.');
      return NextResponse.json(
        { success: false, error: 'Server authentication unconfigured.' },
        { status: 500 }
      );
    }

    // 3. Compare password directly against process.env.ADMIN_SECRET (zero code fallbacks)
    if (password && password === adminSecret) {
      const response = NextResponse.json({ success: true, message: 'Authentication successful' });

      // Determine secure flag: only enforce secure cookie when request is served over HTTPS
      const isHttps = request.headers.get('x-forwarded-proto') === 'https' || request.nextUrl.protocol === 'https:';

      // Set HTTP-only cookie
      response.cookies.set({
        name: 'admin_token',
        value: 'infomitra_admin_authenticated',
        httpOnly: true,
        secure: isHttps,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid admin passcode' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
