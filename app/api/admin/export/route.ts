import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Admission from "@/lib/models/Admission";
import Enquiry from "@/lib/models/Enquiry";
import { requireAuth } from "@/lib/middleware/auth";
import ExcelJS from "exceljs";

export async function GET(request: NextRequest) {
  try {
    const { user, error, status } = requireAuth(request, true);
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    await dbConnect();
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || "admissions"; // 'admissions' or 'enquiries'

    const workbook = new ExcelJS.Workbook();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    if (type === "admissions") {
      const admissions = await Admission.find().sort({ submittedAt: -1 }).lean();
      const worksheet = workbook.addWorksheet("Admissions");

      // Define columns
      worksheet.columns = [
        { header: "Application Number", key: "applicationNumber", width: 20 },
        { header: "First Name", key: "firstName", width: 15 },
        { header: "Middle Name", key: "middleName", width: 15 },
        { header: "Last Name", key: "lastName", width: 15 },
        { header: "Grade", key: "grade", width: 10 },
        { header: "Board", key: "board", width: 10 },
        { header: "Date of Birth", key: "dob", width: 15 },
        { header: "Gender", key: "gender", width: 10 },
        { header: "Father Email", key: "fatherEmail", width: 30 },
        { header: "Father Mobile", key: "fatherMobile", width: 15 },
        { header: "Mother Email", key: "motherEmail", width: 30 },
        { header: "Mother Mobile", key: "motherMobile", width: 15 },
        { header: "Student Photo URL", key: "studentPhotoUrl", width: 60 },
        { header: "Father Photo URL", key: "fatherPhotoUrl", width: 60 },
        { header: "Mother Photo URL", key: "motherPhotoUrl", width: 60 },
        { header: "Status", key: "status", width: 15 },
        { header: "Submitted At", key: "submittedAt", width: 20 },
      ];

      // Add rows
      admissions.forEach((admission: any) => {
        const fullUrl = (url: string) => url ? `${appUrl}${url}` : "";
        
        worksheet.addRow({
          applicationNumber: admission.applicationNumber || "",
          firstName: admission.firstName,
          middleName: admission.middleName || "",
          lastName: admission.lastName,
          grade: admission.grade,
          board: admission.board,
          dob: admission.dob ? new Date(admission.dob).toLocaleDateString() : "",
          gender: admission.gender,
          fatherEmail: admission.fatherEmail,
          fatherMobile: admission.fatherMobile,
          motherEmail: admission.motherEmail,
          motherMobile: admission.motherMobile,
          studentPhotoUrl: fullUrl(admission.studentPhotoUrl || ""),
          fatherPhotoUrl: fullUrl(admission.fatherPhotoUrl || ""),
          motherPhotoUrl: fullUrl(admission.motherPhotoUrl || ""),
          status: admission.status,
          submittedAt: admission.submittedAt
            ? new Date(admission.submittedAt).toLocaleString()
            : "",
        });
      });
    } else {
      // Enquiries export
      const enquiries = await Enquiry.find().sort({ submittedAt: -1 }).lean();
      const worksheet = workbook.addWorksheet("Enquiries");

      worksheet.columns = [
        { header: "Child Name", key: "childName", width: 25 },
        { header: "Grade", key: "grade", width: 15 },
        { header: "Boarding Type", key: "boardingType", width: 15 },
        { header: "Email", key: "email", width: 30 },
        { header: "Mobile", key: "mobile", width: 15 },
        { header: "Message", key: "message", width: 40 },
        { header: "Submitted At", key: "submittedAt", width: 20 },
      ];

      enquiries.forEach((enquiry: any) => {
        worksheet.addRow({
          childName: enquiry.childName,
          grade: enquiry.grade,
          boardingType: enquiry.boardingType,
          email: enquiry.email,
          mobile: enquiry.mobile,
          message: enquiry.message || "",
          submittedAt: enquiry.submittedAt
            ? new Date(enquiry.submittedAt).toLocaleString()
            : "",
        });
      });
    }

    // Style header row
    const headerRow = workbook.worksheets[0].getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1C2C5B" },
    };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();

    const filename = `${type}-${new Date().toISOString().split("T")[0]}.xlsx`;

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}

