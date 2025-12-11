import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Enquiry from "@/lib/models/Enquiry";
import { requireAuth } from "@/lib/middleware/auth";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user (optional - can be public or require auth)
    // For now, we'll make it optional but can link to user if authenticated
    const authResult = requireAuth(request, false);
    const userId = authResult.user?.userId || undefined;

    await dbConnect();
    const formData = await request.json();

    // Validate required fields
    if (!formData.childName || !formData.email || !formData.mobile || !formData.grade || !formData.boardingType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new enquiry in MongoDB
    const enquiry = await Enquiry.create({
      childName: formData.childName,
      grade: formData.grade,
      boardingType: formData.boardingType,
      email: formData.email.toLowerCase(),
      mobile: formData.mobile,
      message: formData.message || '',
      submittedBy: userId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully",
        id: enquiry._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

