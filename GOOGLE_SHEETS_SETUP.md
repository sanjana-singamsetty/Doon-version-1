# Google Sheets Setup Guide

This guide will help you set up Google Sheets integration to store admission form submissions.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it something like "Admission Applications" or "Doon School Admissions"
4. **Important**: Make the sheet publicly editable (or use the method below)

## Step 2: Get Your Google Sheet ID

1. Open your Google Sheet
2. Look at the URL in your browser. It will look like:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
   ```
3. Copy the `YOUR_SHEET_ID_HERE` part - this is your Sheet ID

## Step 3: Set Up Service Account (Required)

**Important**: Google Sheets API v4 requires OAuth2 or Service Account authentication for write operations. API keys only work for read-only access.

### Create a Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and click "Enable"
4. Create a Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Give it a name (e.g., "sheets-writer")
   - Click "Create and Continue"
   - Skip role assignment, click "Done"
5. Create a Key for the Service Account:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format
   - Download the JSON file (keep this secure!)
6. Share your Google Sheet with the Service Account:
   - Open the downloaded JSON file
   - Find the `client_email` field (it looks like: `your-service-account@project-id.iam.gserviceaccount.com`)
   - Open your Google Sheet
   - Click "Share" button
   - Paste the service account email address
   - Give it "Editor" permission
   - Click "Send"

## Step 4: Set Up Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Open the JSON file you downloaded from Step 3
3. Copy the entire JSON content
4. Add the following variables to `.env.local`:

```env
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
```

**Important Notes:**
- Replace `your_sheet_id_here` with your actual Google Sheet ID
- Replace the entire JSON object after `GOOGLE_SERVICE_ACCOUNT_KEY=` with the complete JSON content from the downloaded file
- The JSON must be on a single line (no line breaks)
- Make sure the JSON is properly escaped if it contains quotes

**Alternative Method (Multi-line JSON):**
If you prefer, you can also store the JSON in a separate file and read it, but the single-line method above is simpler for this setup.

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Fill out the admission form completely
3. Submit the form
4. Check your Google Sheet - you should see:
   - Headers in the first row (automatically added on first submission)
   - Your form data in the second row

## Troubleshooting

### Error: "Google Sheets configuration missing"
- Make sure your `.env.local` file exists and has the correct variable names
- Restart your development server after adding environment variables

### Error: "Failed to save to Google Sheets"
- Check that your API key is correct
- Verify the Sheet ID is correct
- Make sure the Google Sheets API is enabled in Google Cloud Console
- If using public access, ensure the sheet is shared with "Anyone with the link" as Editor

### Headers not appearing
- The headers are automatically added on the first submission
- If you want to add them manually, the headers are:
  - Timestamp, First Name, Middle Name, Last Name, Gender, Grade, Board/Curriculum, Date of Birth, etc.

## Column Headers (Auto-generated)

The following columns will be automatically created in your sheet:
- Timestamp
- First Name, Middle Name, Last Name
- Gender, Grade, Board/Curriculum
- Date of Birth, Birth Region/District, Birth State, Nationality
- Aadhar Card No, Blood Group, Identification Marks
- Address fields (Correspondence and Permanent)
- Personal information (Mother Tongue, Religion, Category, etc.)
- Siblings Details
- Student Photo status
- Father's details (Name, Mobile, Email, Aadhar, Qualification, Profession, Photo)
- Mother's details (Name, Mobile, Email, Aadhar, Qualification, Profession, Photo)
- Gross Annual Income

## Security Notes

- Never commit `.env.local` to version control
- For production, use environment variables in your hosting platform
- Consider using Service Account method for better security
- Restrict API key to specific APIs and IPs if possible

