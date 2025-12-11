#!/bin/bash

# Setup script to create .env.local file with MongoDB credentials

echo "Setting up .env.local file for Doon International School project..."
echo ""

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists. Creating backup as .env.local.backup"
    cp .env.local .env.local.backup
fi

# Create .env.local with MongoDB credentials
cat > .env.local << 'EOF'
# MongoDB Connection
MONGODB_URI=mongodb+srv://dev_db_user:DOON_in@doon-in-school.hpgy6y4.mongodb.net/doon-school?retryWrites=true&w=majority

# JWT Secret (generate a random string, min 32 characters)
# IMPORTANT: Change this to a secure random string in production!
JWT_SECRET=doon-international-school-jwt-secret-key-2024-change-in-production-min-32-characters

# Email Configuration (for OTP)
# Option 1: Gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@dooninternational.com

# Option 2: Hostinger Email (uncomment and configure)
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
EOF

echo "✅ .env.local file created successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Configure your email settings (for OTP functionality)"
echo "2. Change the ADMIN_PASSWORD to something secure"
echo "3. Run: npx tsx scripts/test-mongodb-connection.ts (to test connection)"
echo "4. Run: npx tsx scripts/init-admin.ts (to create admin user)"
echo ""

