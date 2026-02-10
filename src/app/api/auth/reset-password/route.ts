import { NextResponse } from 'next/server';
import { AuthService } from '@/services/AuthService';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 });
    }

    const success = await AuthService.resetPassword(token, password);

    if (!success) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Password has been reset successfully' });
  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

