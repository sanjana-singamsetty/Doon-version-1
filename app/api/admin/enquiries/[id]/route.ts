import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Enquiry from "@/lib/models/Enquiry";
import { requireAuth } from "@/lib/middleware/auth";

// DELETE enquiry by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error, status } = requireAuth(request, true);
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    await dbConnect();
    const deleted = await Enquiry.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return NextResponse.json(
      { error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}

// GET single enquiry
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error, status } = requireAuth(request, true);
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    await dbConnect();
    const enquiry = await Enquiry.findById(params.id).populate(
      "submittedBy",
      "email"
    );

    if (!enquiry) {
      return NextResponse.json(
        { error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ enquiry });
  } catch (error) {
    console.error("Error fetching enquiry:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiry" },
      { status: 500 }
    );
  }
}

