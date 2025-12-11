import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/lib/models/User";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered. Please sign in instead.' },
        { status: 400 }
      );
    }

    // Create new user (OTP will be sent separately)
    const user = await User.create({
      email: email.toLowerCase(),
      role: 'user',
      emailVerified: false,
    });

    return NextResponse.json({
      success: true,
      message: 'Account created successfully. Please verify your email with OTP.',
      userId: user._id,
    });
  } catch (error) {
    console.error('Error signing up:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}

