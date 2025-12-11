/**
 * Seed Dummy Data Script
 * 
 * Run this to add dummy data for testing:
 * npx tsx scripts/seed-dummy-data.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { resolve } from 'path';
import Enquiry from '../lib/models/Enquiry';
import Admission from '../lib/models/Admission';
import User from '../lib/models/User';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

async function seedData() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await Enquiry.deleteMany({});
    await Admission.deleteMany({});
    // Don't delete users (keep admin)
    console.log('✅ Data cleared');

    // Create dummy enquiries
    console.log('📝 Creating dummy enquiries...');
    const enquiries = await Enquiry.insertMany([
      {
        childName: 'Rahul Kumar',
        grade: 'Grade 6',
        boardingType: 'Day Scholar',
        email: 'rahul.parent@example.com',
        mobile: '9876543210',
        message: 'Interested in admission for Grade 6. Please provide more information.',
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        childName: 'Priya Sharma',
        grade: 'Grade 9',
        boardingType: 'Boarding',
        email: 'priya.parent@example.com',
        mobile: '9876543211',
        message: 'Looking for boarding facilities for my daughter.',
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        childName: 'Arjun Reddy',
        grade: 'Grade 3',
        boardingType: 'Day Scholar',
        email: 'arjun.parent@example.com',
        mobile: '9876543212',
        message: 'Need information about CBSE curriculum.',
        submittedAt: new Date(),
      },
      {
        childName: 'Sneha Patel',
        grade: 'Grade 11',
        boardingType: 'Boarding',
        email: 'sneha.parent@example.com',
        mobile: '9876543213',
        message: 'Interested in IB program.',
        submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      },
      {
        childName: 'Vikram Singh',
        grade: 'Grade 5',
        boardingType: 'Day Scholar',
        email: 'vikram.parent@example.com',
        mobile: '9876543214',
        message: 'When does the admission process start?',
        submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
    ]);
    console.log(`✅ Created ${enquiries.length} enquiries`);

    // Create dummy admissions
    console.log('📝 Creating dummy admissions...');
    const admissions = await Admission.insertMany([
      {
        firstName: 'Raj',
        middleName: 'Kumar',
        lastName: 'Sharma',
        gender: 'Male',
        grade: 'Grade 6',
        board: 'CBSE',
        dob: new Date('2012-05-15'),
        birthRegion: 'Hyderabad',
        birthState: 'Telangana',
        nationality: 'Indian',
        aadhar: '1234 5678 9012',
        bloodGroup: 'O+',
        identificationMarks: ['Mole on left cheek', ''],
        correspondenceAddress: '123 Main Street',
        area: 'Hitech City',
        district: 'Hyderabad',
        state: 'Telangana',
        country: 'India',
        pincode: '500081',
        samePermanentAddress: true,
        motherTongue: 'Hindi',
        religion: 'Hindu',
        category: 'General',
        caste: 'Sharma',
        subCaste: '',
        apaarId: '',
        familyStructure: 'Nuclear',
        siblings: [],
        fatherFullName: 'Ramesh Sharma',
        fatherMobileCode: '+91',
        fatherMobile: '9876543210',
        fatherEmail: 'father1@example.com',
        fatherAadhar: '2345 6789 0123',
        fatherQualification: 'B.Tech',
        fatherProfession: 'Software Engineer',
        motherFullName: 'Sunita Sharma',
        motherMobileCode: '+91',
        motherMobile: '9876543211',
        motherEmail: 'mother1@example.com',
        motherAadhar: '3456 7890 1234',
        motherQualification: 'M.A.',
        motherProfession: 'Teacher',
        grossAnnualIncome: '1500000',
        status: 'submitted',
        submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        firstName: 'Ananya',
        lastName: 'Patel',
        gender: 'Female',
        grade: 'Grade 9',
        board: 'IB',
        dob: new Date('2009-08-20'),
        birthRegion: 'Mumbai',
        birthState: 'Maharashtra',
        nationality: 'Indian',
        aadhar: '4567 8901 2345',
        bloodGroup: 'A+',
        identificationMarks: ['Scar on right hand', ''],
        correspondenceAddress: '456 Park Avenue',
        area: 'Bandra',
        district: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        pincode: '400050',
        samePermanentAddress: false,
        permanentAddress: '789 Ocean Drive',
        permanentArea: 'Colaba',
        permanentDistrict: 'Mumbai',
        permanentState: 'Maharashtra',
        permanentCountry: 'India',
        permanentPincode: '400005',
        motherTongue: 'Gujarati',
        religion: 'Hindu',
        category: 'OBC',
        caste: 'Patel',
        subCaste: 'Gujarati',
        apaarId: 'APAAR123456',
        familyStructure: 'Joint',
        siblings: [
          {
            name: 'Aarav Patel',
            age: '12',
            institution: 'Doon International',
            standard: 'Grade 7',
          },
        ],
        fatherFullName: 'Amit Patel',
        fatherMobileCode: '+91',
        fatherMobile: '9876543220',
        fatherEmail: 'father2@example.com',
        fatherAadhar: '5678 9012 3456',
        fatherQualification: 'MBA',
        fatherProfession: 'Business Owner',
        motherFullName: 'Meera Patel',
        motherMobileCode: '+91',
        motherMobile: '9876543221',
        motherEmail: 'mother2@example.com',
        motherAadhar: '6789 0123 4567',
        motherQualification: 'B.Com',
        motherProfession: 'Accountant',
        grossAnnualIncome: '2500000',
        status: 'under-review',
        submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        firstName: 'Karan',
        middleName: 'Singh',
        lastName: 'Malhotra',
        gender: 'Male',
        grade: 'Grade 11',
        board: 'CBSE',
        dob: new Date('2007-03-10'),
        birthRegion: 'Delhi',
        birthState: 'Delhi',
        nationality: 'Indian',
        aadhar: '7890 1234 5678',
        bloodGroup: 'B+',
        identificationMarks: ['Birthmark on neck', ''],
        correspondenceAddress: '321 Connaught Place',
        area: 'CP',
        district: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        pincode: '110001',
        samePermanentAddress: true,
        motherTongue: 'Punjabi',
        religion: 'Sikh',
        category: 'General',
        caste: 'Malhotra',
        subCaste: '',
        apaarId: 'APAAR789012',
        familyStructure: 'Nuclear',
        siblings: [],
        fatherFullName: 'Harpreet Malhotra',
        fatherMobileCode: '+91',
        fatherMobile: '9876543230',
        fatherEmail: 'father3@example.com',
        fatherAadhar: '8901 2345 6789',
        fatherQualification: 'M.D.',
        fatherProfession: 'Doctor',
        motherFullName: 'Jaspreet Malhotra',
        motherMobileCode: '+91',
        motherMobile: '9876543231',
        motherEmail: 'mother3@example.com',
        motherAadhar: '9012 3456 7890',
        motherQualification: 'BDS',
        motherProfession: 'Dentist',
        grossAnnualIncome: '3500000',
        status: 'accepted',
        submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
      {
        firstName: 'Sara',
        lastName: 'Johnson',
        gender: 'Female',
        grade: 'Grade 5',
        board: 'IB',
        dob: new Date('2013-11-25'),
        birthRegion: 'Bangalore',
        birthState: 'Karnataka',
        nationality: 'Indian',
        aadhar: '0123 4567 8901',
        bloodGroup: 'AB+',
        identificationMarks: ['None', ''],
        correspondenceAddress: '654 MG Road',
        area: 'Koramangala',
        district: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
        pincode: '560095',
        samePermanentAddress: true,
        motherTongue: 'English',
        religion: 'Christian',
        category: 'General',
        caste: 'Christian',
        subCaste: '',
        apaarId: '',
        familyStructure: 'Nuclear',
        siblings: [],
        fatherFullName: 'John Johnson',
        fatherMobileCode: '+91',
        fatherMobile: '9876543240',
        fatherEmail: 'father4@example.com',
        fatherAadhar: '1234 5678 9012',
        fatherQualification: 'Ph.D.',
        fatherProfession: 'Professor',
        motherFullName: 'Mary Johnson',
        motherMobileCode: '+91',
        motherMobile: '9876543241',
        motherEmail: 'mother4@example.com',
        motherAadhar: '2345 6789 0123',
        motherQualification: 'M.Sc.',
        motherProfession: 'Scientist',
        grossAnnualIncome: '2800000',
        status: 'submitted',
        submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    ]);

    // Generate application numbers for submitted admissions
    for (const admission of admissions) {
      if (admission.status === 'submitted' && !admission.applicationNumber) {
        const year = new Date().getFullYear();
        const count = await Admission.countDocuments({
          board: admission.board,
          submittedAt: { $gte: new Date(year, 0, 1) },
          _id: { $lte: admission._id },
        });
        admission.applicationNumber = `DIS-${year}-${String(count).padStart(6, '0')}`;
        await admission.save();
      }
    }

    console.log(`✅ Created ${admissions.length} admissions`);

    console.log('\n✅ Dummy data seeded successfully!');
    console.log(`   - ${enquiries.length} enquiries`);
    console.log(`   - ${admissions.length} admissions`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  }
}

seedData();

