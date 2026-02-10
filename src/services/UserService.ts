import User from '@/models/User';
import Lead from '@/models/Lead';
import dbConnect from '@/lib/mongodb';
import { sendEmail } from '@/lib/mail';

export class UserService {
  static async getUserProfile(userId: string) {
    await dbConnect();
    return await User.findById(userId).select('-password');
  }

  static async updateProfile(userId: string, name: string) {
    await dbConnect();
    return await User.findByIdAndUpdate(userId, { name }, { new: true }).select('-password');
  }

  static async updatePlan(userId: string, plan: string) {
    await dbConnect();
    return await User.findByIdAndUpdate(userId, { plan }, { new: true }).select('-password');
  }
}

export class SalesService {
  static async handleInquiry(data: { firstName: string, lastName: string, email: string, projectDetails: string }) {
    await dbConnect();
    const lead = await Lead.create({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      projectDetails: data.projectDetails,
    });

    try {
      await sendEmail({
        to: process.env.EMAIL_FROM || 'admin@primetrade.com',
        subject: `New Enterprise Inquiry: ${lead.name}`,
        html: `<h3>New Sales Lead</h3><p><strong>Name:</strong> ${lead.name}</p><p><strong>Email:</strong> ${lead.email}</p><p><strong>Details:</strong> ${lead.projectDetails}</p>`
      });
    } catch (e) {
      console.error('Email notification failed but lead was saved');
    }

    return lead;
  }
}
