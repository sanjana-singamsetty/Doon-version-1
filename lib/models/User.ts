import { Schema, model, models, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  _id?: string;
  email?: string; // Optional for mobile-only users
  password?: string; // Only for admin, null for regular users
  role: 'user' | 'admin';
  otp?: string;
  otpExpires?: Date;
  emailVerified: boolean;
  mobile?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: false, // Not required for mobile-only users
      unique: true,
      sparse: true, // Allows multiple null values
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    otp: String,
    otpExpires: Date,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    mobile: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving (for admin)
UserSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) {
    return;
  }
  try {
    this.password = await bcrypt.hash(this.password, 12);
  } catch (error) {
    throw error;
  }
});

// Indexes
UserSchema.index({ role: 1 });

const User: Model<IUser> = models.User || model<IUser>('User', UserSchema);

export default User;

