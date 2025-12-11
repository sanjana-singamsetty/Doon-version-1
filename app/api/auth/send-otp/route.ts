import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/lib/models/User";
import { generateOTP, getOTPExpiry } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, isSignIn } = await request.json(); // isSignIn: true for sign in, false/undefined for sign up

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const otp = generateOTP();
    const otpExpires = getOTPExpiry();

    // Check if user exists
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (user && user.role === 'admin') {
      return NextResponse.json(
        { error: 'Admin accounts cannot use OTP login. Please use admin login.' },
        { status: 403 }
      );
    }

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
        { error: 'Email already registered. Please sign in instead.' },
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
      user = await User.create({
        email: email.toLowerCase(),
        role: 'user',
        otp,
        otpExpires,
        emailVerified: false,
      });
    }

    // Send OTP email (will log to console if email fails in development)
    try {
      await sendOTPEmail(email, otp);
    } catch (emailError) {
      // Email sending failed, but in development we log to console
      // So we continue and return success with OTP in response for development
      console.error('Email sending failed:', emailError);
      
      // In development, return OTP in response so user can use it
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          success: true,
          message: 'OTP generated (email not configured - check console)',
          otp: otp, // Include OTP in dev mode
        });
      }
      
      // In production, return error
      throw emailError;
    }

    // In development, also return OTP in response for easier testing
    const response: any = {
      success: true,
      message: 'OTP sent to your email',
    };

    if (process.env.NODE_ENV === 'development') {
      response.otp = otp;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP. Please try again.' },
      { status: 500 }
    );
  }
}

