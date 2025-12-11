import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Enquiry from "@/lib/models/Enquiry";
import { requireAuth } from "@/lib/middleware/auth";

// GET all enquiries with pagination
export async function GET(request: NextRequest) {
  try {
    const { user, error, status } = requireAuth(request, true); // Require admin
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;
    const search = searchParams.get("search") || "";

    // Build query
    const query: any = {};
    if (search) {
      query.$or = [
        { childName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }

    const enquiries = await Enquiry.find(query)
      .populate("submittedBy", "email")
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Enquiry.countDocuments(query);

    return NextResponse.json({
      enquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

