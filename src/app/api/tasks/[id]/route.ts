import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';
import { TaskService } from '@/services/TaskService';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    const { id } = await (params instanceof Promise ? params : Promise.resolve(params));
    const token = req.cookies.get('token')?.value;
    const decoded = verifyJwt(token!) as any;

    const body = await req.json();
    const task = await TaskService.updateTask(id, decoded.userId, body);

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ task });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    const { id } = await (params instanceof Promise ? params : Promise.resolve(params));
    const token = req.cookies.get('token')?.value;
    const decoded = verifyJwt(token!) as any;

    const success = await TaskService.deleteTask(id, decoded.userId);

    if (!success) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

