import { NextResponse } from 'next/server';
import { AuthService } from '@/services/AuthService';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const user = await AuthService.register(body);

    return NextResponse.json({ message: 'User created successfully', userId: user._id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

