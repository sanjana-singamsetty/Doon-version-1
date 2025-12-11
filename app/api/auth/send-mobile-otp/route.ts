import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/lib/models/User";
import { generateOTP, getOTPExpiry } from "@/lib/otp";
// Note: For mobile OTP, you'll need to integrate SMS service like Twilio
// For now, we'll store OTP and it can be sent via SMS API later

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { mobile, isSignIn } = await request.json();

    if (!mobile || !/^\d{10}$/.test(mobile.replace(/\D/g, ''))) {
      return NextResponse.json(
        { error: 'Valid 10-digit mobile number is required' },
        { status: 400 }
      );
    }

    const cleanMobile = mobile.replace(/\D/g, '').slice(-10); // Get last 10 digits
    const otp = generateOTP();
    const otpExpires = getOTPExpiry();

    // Find user by mobile number
    let user = await User.findOne({ mobile: cleanMobile });

    // For sign in, user must exist
    if (isSignIn && !user) {
      return NextResponse.json(
        { error: 'Account not found. Please sign up first.' },
        { status: 404 }
      );
    }

    // For sign up, user should not exist
    if (!isSignIn && user) {
      return NextResponse.json(
        { error: 'Mobile number already registered. Please sign in instead.' },
        { status: 400 }
      );
    }

    if (user) {
      // Update existing user's OTP
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      // Create new user (for sign up flow)
      // Create user with mobile only (no email required)
      user = await User.create({
        email: `${cleanMobile}@mobile.user`, // Temporary email for mobile users
        mobile: cleanMobile,
        role: 'user',
        otp,
        otpExpires,
        emailVerified: false,
      });
    }

    // TODO: Send OTP via SMS (Twilio, etc.)
    // For now, return OTP in response for development
      // In production, remove OTP from response
    console.log(`Mobile OTP for ${cleanMobile}: ${otp}`);

    // TODO: Send SMS via Twilio or similar service
    // For development, return OTP in response
    const response: any = {
      success: true,
      message: 'OTP sent to your mobile number',
    };
    
    if (process.env.NODE_ENV === 'development') {
      response.otp = otp;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error sending mobile OTP:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}

