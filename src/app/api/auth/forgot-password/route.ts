import { NextResponse } from 'next/server';
import { AuthService } from '@/services/AuthService';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Please provide an email' }, { status: 400 });
    }

    await AuthService.requestPasswordReset(email);

    // Always return success to prevent email enumeration
    return NextResponse.json({ message: 'If an account exists with that email, a reset link has been sent.' });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


