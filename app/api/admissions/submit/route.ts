import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Column headers for the Google Sheet
const COLUMN_HEADERS = [
  "Timestamp",
  "First Name",
  "Middle Name",
  "Last Name",
  "Gender",
  "Grade",
  "Board/Curriculum",
  "Date of Birth",
  "Birth Region/District",
  "Birth State",
  "Nationality",
  "Aadhar Card No",
  "Blood Group",
  "Identification Marks",
  "Correspondence Address",
  "Area",
  "District",
  "State",
  "Country",
  "Pincode",
  "Same as Permanent Address",
  "Permanent Address",
  "Permanent Area",
  "Permanent District",
  "Permanent State",
  "Permanent Country",
  "Permanent Pincode",
  "Mother Tongue",
  "Religion",
  "Category",
  "Caste",
  "Sub Caste",
  "AAPAR ID",
  "Family Structure",
  "Siblings Details",
  "Student Photo",
  "Father's Full Name",
  "Father's Mobile Number",
  "Father's Email",
  "Father's Aadhar Card",
  "Father's Qualification",
  "Father's Profession",
  "Father's Photo",
  "Mother's Full Name",
  "Mother's Mobile Number",
  "Mother's Email",
  "Mother's Aadhar Card",
  "Mother's Qualification",
  "Mother's Profession",
  "Mother's Photo",
  "Gross Annual Income (INR)",
];

async function getSheetsClient() {
  try {
    // Get service account credentials from environment variable
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    
    if (!serviceAccountKey) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set");
    }

    // Parse the service account key JSON
    let credentials;
    try {
      credentials = JSON.parse(serviceAccountKey);
    } catch (parseError) {
      console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY JSON:", parseError);
      throw new Error("Invalid JSON format in GOOGLE_SERVICE_ACCOUNT_KEY");
    }
    
    // Fix private key: ensure newlines are properly formatted
    // Handle both escaped newlines (\n) and actual newlines
    let privateKey = credentials.private_key;
    if (!privateKey) {
      throw new Error("private_key not found in service account credentials");
    }
    
    // Replace escaped newlines with actual newlines
    // This handles the case where JSON.stringify or env var storage escaped them
    privateKey = privateKey.replace(/\\n/g, '\n');
    
    // Additional check: if still no actual newlines, try another approach
    if (!privateKey.includes('\n') && privateKey.includes('\\n')) {
      // Double-escaped case
      privateKey = privateKey.replace(/\\\\n/g, '\n');
    }
    
    // Validate the key format
    if (!privateKey.includes('BEGIN PRIVATE KEY') || !privateKey.includes('END PRIVATE KEY')) {
      console.error("Private key format appears incorrect - missing BEGIN/END markers");
      throw new Error("Invalid private key format");
    }
    
    // Create JWT client for service account
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    // Create and return the Sheets API client
    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error("Error creating Sheets client:", error);
    throw error;
  }
}

async function ensureHeadersExist(sheets: any, spreadsheetId: string) {
  try {
    // Check if sheet has data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A1:Z1',
    });
    
    const existingValues = response.data.values;
    
    // If first row is empty or doesn't match headers, add headers
    if (!existingValues || existingValues.length === 0 || 
        JSON.stringify(existingValues[0]) !== JSON.stringify(COLUMN_HEADERS)) {
      // Add headers
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'A1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [COLUMN_HEADERS],
        },
      });
    }
  } catch (error) {
    console.error("Error ensuring headers:", error);
    // Continue anyway - headers might already exist
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Get Google Sheet ID from environment variable
    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

    if (!SPREADSHEET_ID) {
      return NextResponse.json(
        { 
          error: "Google Sheets configuration missing. Please set GOOGLE_SHEET_ID in your .env.local file. See GOOGLE_SHEETS_SETUP.md for instructions." 
        },
        { status: 500 }
      );
    }

    // Get Sheets API client
    const sheets = await getSheetsClient();

    // Ensure headers exist (only runs if sheet is empty)
    await ensureHeadersExist(sheets, SPREADSHEET_ID);

    // Format the data for Google Sheets
    // Prepare row data with all fields
    const rowData = [
      new Date().toISOString(), // Timestamp
      formData.firstName || "",
      formData.middleName || "",
      formData.lastName || "",
      formData.gender || "",
      formData.grade || "",
      formData.board || "",
      formData.dob || "",
      formData.birthRegion || "",
      formData.birthState || "",
      formData.nationality || "",
      formData.aadhar || "",
      formData.bloodGroup || "",
      formData.identificationMarks?.join(", ") || "",
      formData.correspondenceAddress || "",
      formData.area || "",
      formData.district || "",
      formData.state || "",
      formData.country || "",
      formData.pincode || "",
      formData.samePermanentAddress ? "Yes" : "No",
      formData.permanentAddress || "",
      formData.permanentArea || "",
      formData.permanentDistrict || "",
      formData.permanentState || "",
      formData.permanentCountry || "",
      formData.permanentPincode || "",
      formData.motherTongue || "",
      formData.religion || "",
      formData.category || "",
      formData.caste || "",
      formData.subCaste || "",
      formData.apaarId || "",
      formData.familyStructure || "",
      formData.siblings?.map((s: any) => `${s.name} (${s.age}, ${s.institution}, ${s.standard})`).join("; ") || "",
      formData.studentPhoto ? "Uploaded" : "",
      // Parent details
      formData.fatherFullName || "",
      `${formData.fatherMobileCode || ""} ${formData.fatherMobile || ""}`.trim(),
      formData.fatherEmail || "",
      formData.fatherAadhar || "",
      formData.fatherQualification || "",
      formData.fatherProfession || "",
      formData.fatherPhoto ? "Uploaded" : "",
      formData.motherFullName || "",
      `${formData.motherMobileCode || ""} ${formData.motherMobile || ""}`.trim(),
      formData.motherEmail || "",
      formData.motherAadhar || "",
      formData.motherQualification || "",
      formData.motherProfession || "",
      formData.motherPhoto ? "Uploaded" : "",
      formData.grossAnnualIncome || "",
    ];

    // Prepare the request body for Google Sheets API
    const values = [rowData];

    // Use Google Sheets API v4 to append data
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'A:A',
      valueInputOption: 'RAW',
      requestBody: {
        values: values,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Form submitted successfully",
        result: result.data 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

