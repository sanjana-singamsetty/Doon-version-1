import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Admission from "@/lib/models/Admission";
import { requireAuth } from "@/lib/middleware/auth";

// GET all admissions with pagination
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
    const statusFilter = searchParams.get("status") || "";
    const boardFilter = searchParams.get("board") || "";

    // Build query
    const query: any = {};
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { fatherEmail: { $regex: search, $options: "i" } },
        { motherEmail: { $regex: search, $options: "i" } },
        { applicationNumber: { $regex: search, $options: "i" } },
      ];
    }
    if (statusFilter) {
      query.status = statusFilter;
    }
    if (boardFilter) {
      query.board = boardFilter;
    }

    const admissions = await Admission.find(query)
      .populate("submittedBy", "email")
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Admission.countDocuments(query);

    return NextResponse.json({
      admissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching admissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch admissions" },
      { status: 500 }
    );
  }
}

