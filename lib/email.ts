import nodemailer from 'nodemailer';

// Create transporter - will use environment variables
const createTransporter = () => {
  // If email config not provided, use a simple console logger for development
  if (!process.env.EMAIL_HOST) {
    console.warn('EMAIL_HOST not configured. OTP emails will be logged to console.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export async function sendOTPEmail(email: string, otp: string): Promise<void> {
  const transporter = createTransporter();

  // If no transporter (no email config), log to console
  if (!transporter) {
    console.log('\n=== OTP EMAIL (Development Mode - Email not configured) ===');
    console.log(`To: ${email}`);
    console.log(`OTP: ${otp}`);
    console.log('===========================================================\n');
    return;
  }

  // Check if email credentials are properly configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('\n=== OTP EMAIL (Development Mode - Email credentials not set) ===');
    console.log(`To: ${email}`);
    console.log(`OTP: ${otp}`);
    console.log('===============================================================\n');
    return;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Doon International School - OTP Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1C2C5B; padding: 20px; text-align: center;">
            <h1 style="color: #E5B93C; margin: 0;">Doon International School</h1>
          </div>
          <div style="background-color: #f5f5f5; padding: 30px;">
            <h2 style="color: #1C2C5B;">OTP Verification</h2>
            <p style="font-size: 16px; color: #333;">Your OTP for login is:</p>
            <div style="background-color: white; padding: 20px; text-align: center; margin: 20px 0; border: 2px solid #E5B93C; border-radius: 8px;">
              <h1 style="color: #E5B93C; font-size: 36px; letter-spacing: 8px; margin: 0; font-family: monospace;">${otp}</h1>
            </div>
            <p style="font-size: 14px; color: #666;">This OTP is valid for 10 minutes.</p>
            <p style="font-size: 14px; color: #666;">If you didn't request this OTP, please ignore this email.</p>
          </div>
          <div style="background-color: #1C2C5B; padding: 15px; text-align: center; color: white; font-size: 12px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Doon International School. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent successfully to ${email}`);
  } catch (error) {
    // If email sending fails, log to console for development
    console.error('Failed to send email, logging OTP to console:', error);
    console.log('\n=== OTP EMAIL (Email sending failed - Development Mode) ===');
    console.log(`To: ${email}`);
    console.log(`OTP: ${otp}`);
    console.log('===========================================================\n');
    
    // In development, we don't throw - just log
    // In production, you might want to throw or handle differently
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
}

