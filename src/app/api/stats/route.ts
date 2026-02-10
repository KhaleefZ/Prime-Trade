import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import { verifyJwt } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = verifyJwt(token) as any;
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();

    const tasks = await Task.find({ userId: decoded.userId });

    const stats = {
      total: tasks.length,
      todo: tasks.filter((t: any) => t.status === 'todo').length,
      inProgress: tasks.filter((t: any) => t.status === 'in-progress').length,
      done: tasks.filter((t: any) => t.status === 'done').length,
      highPriority: tasks.filter((t: any) => t.priority === 'high').length,
    };

    return NextResponse.json({ stats });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
