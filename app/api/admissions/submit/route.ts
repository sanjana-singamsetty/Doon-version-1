import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Admission from "@/lib/models/Admission";
import { requireAuth } from "@/lib/middleware/auth";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user (optional - can link to user if authenticated)
    const authResult = requireAuth(request, false);
    const userId = authResult.user?.userId || undefined;

    await dbConnect();
    const formData = await request.json();

    // Map form data to Admission model
    // Handle image URLs - they should be uploaded separately via /api/upload/image
    const admissionData = {
      // Student Details
      firstName: formData.firstName,
      middleName: formData.middleName || '',
      lastName: formData.lastName,
      gender: formData.gender,
      grade: formData.grade,
      board: formData.board,
      dob: new Date(formData.dob),
      birthRegion: formData.birthRegion,
      birthState: formData.birthState,
      nationality: formData.nationality,
      aadhar: formData.aadhar,
      bloodGroup: formData.bloodGroup,
      identificationMarks: formData.identificationMarks || ['', ''],
      
      // Address
      correspondenceAddress: formData.correspondenceAddress,
      area: formData.area,
      district: formData.district,
      state: formData.state,
      country: formData.country,
      pincode: formData.pincode,
      samePermanentAddress: formData.samePermanentAddress || false,
      permanentAddress: formData.permanentAddress || '',
      permanentArea: formData.permanentArea || '',
      permanentDistrict: formData.permanentDistrict || '',
      permanentState: formData.permanentState || '',
      permanentCountry: formData.permanentCountry || '',
      permanentPincode: formData.permanentPincode || '',
      
      // Additional Details
      motherTongue: formData.motherTongue,
      religion: formData.religion,
      category: formData.category,
      caste: formData.caste,
      subCaste: formData.subCaste || '',
      apaarId: formData.apaarId || '',
      familyStructure: formData.familyStructure,
      siblings: formData.siblings || [],
      
      // Parent Details
      fatherFullName: formData.fatherFullName,
      fatherMobileCode: formData.fatherMobileCode || '+91',
      fatherMobile: formData.fatherMobile,
      fatherEmail: formData.fatherEmail?.toLowerCase(),
      fatherAadhar: formData.fatherAadhar,
      fatherQualification: formData.fatherQualification,
      fatherProfession: formData.fatherProfession,
      motherFullName: formData.motherFullName,
      motherMobileCode: formData.motherMobileCode || '+91',
      motherMobile: formData.motherMobile,
      motherEmail: formData.motherEmail?.toLowerCase(),
      motherAadhar: formData.motherAadhar,
      motherQualification: formData.motherQualification,
      motherProfession: formData.motherProfession,
      grossAnnualIncome: formData.grossAnnualIncome,
      
      // Image URLs (from upload API)
      studentPhotoUrl: formData.studentPhotoUrl || formData.studentPhoto || '',
      fatherPhotoUrl: formData.fatherPhotoUrl || formData.fatherPhoto || '',
      motherPhotoUrl: formData.motherPhotoUrl || formData.motherPhoto || '',
      
      // Status
      status: 'submitted' as const,
      submittedBy: userId,
    };

    // Create admission in MongoDB
    const admission = await Admission.create(admissionData);

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        id: admission._id,
        applicationNumber: admission.applicationNumber,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting admission:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

