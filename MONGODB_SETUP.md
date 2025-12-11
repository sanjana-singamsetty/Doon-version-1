# MongoDB Setup Guide

This guide will help you set up MongoDB integration for the Doon International School project.

## Prerequisites

1. MongoDB Atlas account (free tier works)
2. Node.js and npm installed
3. Environment variables configured

## Step 1: Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection
# IMPORTANT: Replace with your actual MongoDB Atlas connection string
# Get it from: MongoDB Atlas > Connect > Connect your application
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority

# JWT Secret (generate a random string, min 32 characters)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters

# Email Configuration (for OTP)
# Option 1: Gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@dooninternational.com

# Option 2: Hostinger Email
# EMAIL_HOST=smtp.hostinger.com
# EMAIL_PORT=587
# EMAIL_USER=your-email@yourdomain.com
# EMAIL_PASSWORD=your-password
# EMAIL_FROM=noreply@yourdomain.com

# Admin Account (used when initializing admin)
ADMIN_EMAIL=admin@dooninternational.com
ADMIN_PASSWORD=ChangeThisSecurePassword123!

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
```

## Step 2: Initialize Admin User

Run the initialization script to create the admin user:

```bash
npx tsx scripts/init-admin.ts
```

Or with ts-node:

```bash
npx ts-node scripts/init-admin.ts
```

**Important:** Change the default admin password after first login!

## Step 3: Email Setup (for OTP)

### Option A: Gmail (Recommended for development)

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an "App Password"
4. Use the app password in `EMAIL_PASSWORD`

### Option B: Hostinger Email

1. Get your SMTP credentials from Hostinger
2. Update the email configuration in `.env.local`

### Option C: Development Mode (No email required)

If email is not configured, OTPs will be logged to the console for development purposes.

## Step 4: Test the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Test user login:
   - Go to `/admissions/login`
   - Enter an email address
   - Check console/logs for OTP (if email not configured)
   - Enter OTP to login

3. Test admin login:
   - Go to `/admin/login`
   - Use the admin credentials you set up

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP and get JWT token
- `POST /api/auth/admin/login` - Admin login (email + password)
- `POST /api/auth/logout` - Logout

### Form Submissions
- `POST /api/enquiry/submit` - Submit enquiry form
- `POST /api/admissions/submit` - Submit admission application
- `POST /api/upload/image` - Upload images (requires auth)

### Admin (requires admin authentication)
- `GET /api/admin/enquiries` - Get all enquiries (with pagination)
- `GET /api/admin/enquiries/[id]` - Get single enquiry
- `DELETE /api/admin/enquiries/[id]` - Delete enquiry
- `GET /api/admin/admissions` - Get all admissions (with pagination)
- `GET /api/admin/admissions/[id]` - Get single admission
- `DELETE /api/admin/admissions/[id]` - Delete admission
- `PATCH /api/admin/admissions/[id]` - Update admission status
- `GET /api/admin/export?type=admissions` - Export admissions to Excel
- `GET /api/admin/export?type=enquiries` - Export enquiries to Excel

## Database Models

### User
- Stores user accounts (regular users and admins)
- Regular users: OTP-based authentication
- Admins: Password-based authentication

### Enquiry
- Stores enquiry form submissions
- Fields: childName, grade, boardingType, email, mobile, message

### Admission
- Stores admission form submissions
- Auto-generates application numbers: `DIS-YYYY-XXXXXX`
- Statuses: draft, submitted, under-review, accepted, rejected
- Stores image URLs (images saved to `/public/uploads/`)

## Image Storage

Images are stored on the server in `/public/uploads/`:
- `/public/uploads/students/` - Student photos
- `/public/uploads/fathers/` - Father photos
- `/public/uploads/mothers/` - Mother photos

Images are optimized using Sharp:
- Max dimensions: 800x800px
- Format: JPEG
- Quality: 85%

## Admin Dashboard

The admin dashboard is accessible at `/admin/dashboard` (to be implemented).

Features:
- View all enquiries and admissions
- Search and filter
- Delete entries
- Export to Excel (with image links)
- Update admission status

## Security Notes

1. **JWT_SECRET**: Use a strong, random string in production (min 32 characters)
2. **MongoDB URI**: Keep credentials secure, never commit to git
3. **Admin Password**: Change default password immediately
4. **Image Upload**: Currently requires authentication, consider rate limiting
5. **OTP Expiry**: Currently 10 minutes, adjustable in `lib/otp.ts`

## Deployment Checklist

- [ ] Set all environment variables on hosting platform
- [ ] Initialize admin user on production
- [ ] Configure email service (SMTP)
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Ensure MongoDB Atlas IP whitelist includes server IP
- [ ] Test OTP email delivery
- [ ] Test admin login
- [ ] Test form submissions
- [ ] Test image uploads
- [ ] Verify Excel export functionality

## Troubleshooting

### "MONGODB_URI not defined"
- Ensure `.env.local` exists and contains `MONGODB_URI`
- Restart the development server after adding env variables

### "OTP not sending"
- Check email configuration in `.env.local`
- Check console logs for OTP (development mode)
- Verify SMTP credentials

### "Admin login fails"
- Ensure admin user exists (run init script)
- Check password in `.env.local` matches what you're using
- Verify JWT_SECRET is set

### "Image upload fails"
- Ensure `/public/uploads/` directory exists and is writable
- Check file size limits (max 5MB)
- Verify authentication token is included in request

## Next Steps

1. Implement admin dashboard UI (`/admin/dashboard`)
2. Add more admin features (editing, bulk actions)
3. Add analytics/statistics
4. Implement rate limiting
5. Add email notifications for submissions
6. Add image cleanup job for unused uploads

