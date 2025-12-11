/**
 * Initialize Admin User Script
 * 
 * Run this script to create the initial admin user:
 * npx ts-node scripts/init-admin.ts
 * 
 * Or use tsx:
 * npx tsx scripts/init-admin.ts
 */

import mongoose from 'mongoose';
import User from '../lib/models/User';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables first
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@dooninternational.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeThisSecurePassword123!';

async function initAdmin() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set. Make sure .env.local exists.');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      email: ADMIN_EMAIL.toLowerCase(),
      role: 'admin'
    });

    if (existingAdmin) {
      console.log(`Admin user with email ${ADMIN_EMAIL} already exists.`);
      console.log('To update password, delete the existing admin and run this script again.');
      await mongoose.connection.close();
      return;
    }

    // Create admin user
    console.log('Creating admin user...');
    const admin = await User.create({
      email: ADMIN_EMAIL.toLowerCase(),
      password: ADMIN_PASSWORD,
      role: 'admin',
      emailVerified: true,
    });

    console.log('✅ Admin user created successfully!');
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);
    console.log('\n⚠️  Please change the default password after first login.');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  initAdmin();
}

export default initAdmin;

