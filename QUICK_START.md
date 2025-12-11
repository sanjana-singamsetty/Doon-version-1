# Quick Start Guide - MongoDB Integration

## ✅ Setup Complete!

Your MongoDB connection has been verified and configured:
- **Username**: `dev_db_user`
- **Password**: `DOON_in` (configured)
- **Database**: `doon-school`
- **Cluster**: `doon-in-school.hpgy6y4.mongodb.net`

## 🚀 Next Steps

### 1. Admin User Created
The admin user has been initialized. You can login at `/admin/login` with:
- **Email**: `admin@dooninternational.com`
- **Password**: `ChangeThisSecurePassword123!` (⚠️ **Change this after first login!**)

### 2. Configure Email (Optional but Recommended)
For OTP emails to work, configure email in `.env.local`:

**Option A: Gmail**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password  # Get from Google Account → App Passwords
EMAIL_FROM=noreply@dooninternational.com
```

**Option B: Hostinger Email**
```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=587
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASSWORD=your-email-password
EMAIL_FROM=noreply@yourdomain.com
```

**Note**: If email is not configured, OTPs will be logged to the console during development.

### 3. Start Development Server
```bash
npm run dev
```

### 4. Test the System

#### Test User Login (OTP)
1. Go to `http://localhost:3000/admissions/login`
2. Click "Email Address"
3. Enter your email
4. Check console/email for OTP
5. Enter OTP to login

#### Test Admin Login
1. Go to `http://localhost:3000/admin/login`
2. Login with admin credentials
3. Dashboard coming soon!

#### Test Form Submissions
1. Submit enquiry form from homepage
2. Submit admission form at `/admissions/application`
3. Check MongoDB for stored data

### 5. View Data in MongoDB

You can view your data in MongoDB Atlas:
1. Go to https://cloud.mongodb.com
2. Login with `atlasAdmin@admin`
3. Browse Collections → `doon-school` database
4. View `enquiries`, `admissions`, and `users` collections

## 📊 Database Collections

After using the system, you'll see:

1. **users** - All user accounts (regular users + admin)
2. **enquiries** - Enquiry form submissions
3. **admissions** - Admission form submissions with auto-generated application numbers

## 🔐 Security Reminders

1. ✅ `.env.local` is in `.gitignore` (never commit secrets)
2. ⚠️ Change default admin password after first login
3. ⚠️ Use strong `JWT_SECRET` in production
4. ⚠️ Configure MongoDB IP whitelist for production server

## 🛠️ Useful Scripts

```bash
# Test MongoDB connection
npx tsx scripts/test-mongodb-connection.ts

# Initialize admin user (if needed again)
npx tsx scripts/init-admin.ts

# Setup environment file
bash scripts/setup-env.sh
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/logout` - Logout

### Forms
- `POST /api/enquiry/submit` - Submit enquiry
- `POST /api/admissions/submit` - Submit admission application
- `POST /api/upload/image` - Upload images (requires auth)

### Admin (requires admin auth token)
- `GET /api/admin/enquiries` - List enquiries
- `GET /api/admin/admissions` - List admissions
- `DELETE /api/admin/enquiries/[id]` - Delete enquiry
- `DELETE /api/admin/admissions/[id]` - Delete admission
- `GET /api/admin/export?type=admissions` - Export to Excel

## 🎯 What's Working

✅ MongoDB connection and models
✅ User authentication (OTP + Admin)
✅ Form submissions to MongoDB
✅ Image uploads to server
✅ Admin APIs (view, delete, export)
✅ Auto-generated application numbers

## 🚧 Coming Soon

- Admin dashboard UI
- Form image upload integration (APIs ready, just needs frontend update)

---

**Need Help?** Check `MONGODB_SETUP.md` for detailed documentation.

