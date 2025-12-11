import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/lib/models/User";
import bcrypt from 'bcryptjs';
import { generateToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ 
      email: email.toLowerCase(),
      role: 'admin',
    }).select('+password');

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Ensure email exists (admin must have email)
    if (!user.email) {
      return NextResponse.json(
        { error: 'Admin email not found' },
        { status: 500 }
      );
    }

    const token = generateToken({
      userId: user._id!.toString(),
      email: user.email,
      role: user.role,
    }, true); // Admin token

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });

    // Set HTTP-only cookie for admin
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours for admin
    });

    return response;
  } catch (error) {
    console.error('Error in admin login:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

