import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production-min-32-chars';
const JWT_EXPIRES_IN = '7d'; // 7 days for users
const ADMIN_JWT_EXPIRES_IN = '24h'; // 24 hours for admin

export interface JWTPayload {
  userId: string;
  email?: string; // Optional for mobile-only users
  role: 'user' | 'admin';
}

export function generateToken(payload: JWTPayload, isAdmin: boolean = false): string {
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: isAdmin ? ADMIN_JWT_EXPIRES_IN : JWT_EXPIRES_IN,
    }
  );
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

