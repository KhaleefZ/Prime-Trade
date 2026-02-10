import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import dbConnect from '@/lib/mongodb';
import { sendEmail } from '@/lib/mail';
import { signJwt } from '@/lib/auth';

export class AuthService {
  static async register(data: any) {
    await dbConnect();
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    // Password hashing happens in User model pre-save hook
    const user = await User.create({ name, email, password });
    return user;
  }

  static async login(email: string, password: string) {
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = await signJwt({ userId: user._id.toString(), email: user.email });
    return { user, token };
  }

  static async requestPasswordReset(email: string) {
    await dbConnect();
    // ... rest of the code

    const user = await User.findOne({ email });
    if (!user) return null;

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;
    
    await sendEmail({
      to: email,
      subject: 'Reset Your PrimeTrade Password',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #4f46e5; text-align: center;">PrimeTrade</h2>
          <p>Hi ${user.name || 'there'},</p>
          <p>You requested to reset your password. Please click the button below to set a new password. This link is valid for 1 hour.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px; text-align: center;">Secure Trading with PrimeTrade Intelligence</p>
        </div>
      `
    });

    return true;
  }

  static async resetPassword(token: string, newPassword: string) {
    await dbConnect();

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return false;

    user.password = newPassword; // Mongoose middleware hashes this
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return true;
  }
}
