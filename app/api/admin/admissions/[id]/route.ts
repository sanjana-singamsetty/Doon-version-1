import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Admission from "@/lib/models/Admission";
import { requireAuth } from "@/lib/middleware/auth";

// DELETE admission by ID
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
    const deleted = await Admission.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Admission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting admission:", error);
    return NextResponse.json(
      { error: "Failed to delete admission" },
      { status: 500 }
    );
  }
}

// GET single admission
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
    const admission = await Admission.findById(params.id).populate(
      "submittedBy",
      "email"
    );

    if (!admission) {
      return NextResponse.json(
        { error: "Admission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ admission });
  } catch (error) {
    console.error("Error fetching admission:", error);
    return NextResponse.json(
      { error: "Failed to fetch admission" },
      { status: 500 }
    );
  }
}

// UPDATE admission status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error, status } = requireAuth(request, true);
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    await dbConnect();
    const body = await request.json();
    const { status: newStatus } = body;

    if (!newStatus || !['draft', 'submitted', 'under-review', 'accepted', 'rejected'].includes(newStatus)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const admission = await Admission.findByIdAndUpdate(
      params.id,
      { status: newStatus },
      { new: true }
    );

    if (!admission) {
      return NextResponse.json(
        { error: "Admission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, admission });
  } catch (error) {
    console.error("Error updating admission:", error);
    return NextResponse.json(
      { error: "Failed to update admission" },
      { status: 500 }
    );
  }
}

