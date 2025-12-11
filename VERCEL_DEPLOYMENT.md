# Vercel Deployment Guide

## ⚠️ Important: Image Upload Limitation

**CRITICAL ISSUE**: The current image upload implementation saves files to `/public/uploads/`, which **will NOT work on Vercel** because:

- Vercel has a **read-only filesystem** (except `/tmp`)
- Files saved to `/public/uploads/` will be **lost on each deployment**
- Uploaded images will disappear after every deploy

### Solution Options:

#### Option 1: Use Vercel Blob Storage (Recommended for Vercel)
- Best for Vercel deployments
- Integrated with Vercel
- Easy setup

#### Option 2: Use Cloudinary (Recommended for Production)
- Free tier available
- Image optimization included
- Works with any hosting

#### Option 3: Use AWS S3
- Reliable and scalable
- Requires AWS account

## ✅ What Will Work on Vercel

1. **MongoDB Connection** - ✅ Will work (ensure `MONGODB_URI` is set)
2. **Authentication (OTP)** - ✅ Will work (email will work if credentials are set)
3. **Database Operations** - ✅ Will work
4. **Static Assets** - ✅ Will work (`/public/images/` folder)
5. **API Routes** - ✅ Will work

## ❌ What Won't Work

1. **Image Uploads** - ❌ Current implementation will fail (need cloud storage)

## Required Environment Variables for Vercel

Set these in your Vercel dashboard (Settings → Environment Variables):

### Required:
```env
MONGODB_URI=mongodb+srv://dev_db_user:YOUR_PASSWORD@doon-in-school.hpgy6y4.mongodb.net/?appName=Doon-In-School
JWT_SECRET=your-secret-key-min-32-characters-long-change-in-production
NODE_ENV=production
```

### Optional (for email):
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
```

### Optional (for OTP in development):
```env
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## Quick Fix for Image Uploads

For now, you have two options:

1. **Temporary**: Comment out image upload functionality
2. **Permanent**: Implement cloud storage (Cloudinary recommended)

Would you like me to implement Cloudinary integration for image uploads?

