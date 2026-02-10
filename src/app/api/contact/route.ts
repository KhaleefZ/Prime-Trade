import { NextResponse } from 'next/server';
import { UserService } from '@/services/UserService';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, projectDetails } = await req.json();

    if (!firstName || !lastName || !email || !projectDetails) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const lead = await UserService.createSalesLead({
      name: `${firstName} ${lastName}`,
      email,
      projectDetails,
    });

    return NextResponse.json({ message: 'Inquiry received successfully', leadId: lead._id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

