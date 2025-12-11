/**
 * Test MongoDB Connection Script
 * 
 * Run this to verify your MongoDB connection works:
 * npx tsx scripts/test-mongodb-connection.ts
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
  try {
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set');
      console.log('\nPlease create a .env.local file with:');
      console.log('MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority');
      console.log('\nSee .env.example for template configuration.');
      process.exit(1);
    }

    console.log('🔄 Connecting to MongoDB...');
    console.log(`Connection string: ${MONGODB_URI.replace(/:[^:@]+@/, ':****@')}`); // Hide password in logs
    
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test database operations
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`\n📊 Found ${collections.length} collection(s):`);
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    
    // Ping the database
    await db.admin().ping();
    console.log('\n✅ Database ping successful!');
    
    await mongoose.connection.close();
    console.log('\n✅ Connection closed. MongoDB is ready to use!');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error connecting to MongoDB:');
    console.error(error);
    
    if (error instanceof Error) {
      if (error.message.includes('authentication failed')) {
        console.error('\n💡 Tip: Check your username and password in the connection string');
      } else if (error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
        console.error('\n💡 Tip: Check your network connection and MongoDB Atlas IP whitelist');
      }
    }
    
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  }
}

// Load environment variables
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local explicitly
const envPath = resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

// Also try loading from process.env (in case it's already loaded)
if (!process.env.MONGODB_URI) {
  console.log('⚠️  MONGODB_URI not found in environment variables');
  console.log(`   Looking for .env.local at: ${envPath}`);
}

testConnection();

