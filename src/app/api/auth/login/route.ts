import { NextResponse } from 'next/server';
import { AuthService } from '@/services/AuthService';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { user, token } = await AuthService.login(email, password);

    const response = NextResponse.json({
      message: 'Logged in successfully',
      user: { id: user._id, name: user.name, email: user.email }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

