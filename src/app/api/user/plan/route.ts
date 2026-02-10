import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';
import { UserService } from '@/services/UserService';

export async function PUT(req: NextRequest) {
  try {
    const { plan } = await req.json();
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyJwt(token) as any;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const updatedUser = await UserService.updateUserPlan(decoded.userId, plan);

    return NextResponse.json({ message: 'Plan updated successfully', user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

