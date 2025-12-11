import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { JWTPayload } from '@/lib/jwt';

export interface AuthRequest extends NextRequest {
  user?: JWTPayload;
}

export function authenticate(request: NextRequest): { user: JWTPayload | null; error: string | null } {
  const token = request.headers.get('authorization')?.replace('Bearer ', '') ||
                request.cookies.get('auth-token')?.value;

  if (!token) {
    return { user: null, error: 'No token provided' };
  }

  const payload = verifyToken(token);
  if (!payload) {
    return { user: null, error: 'Invalid token' };
  }

  return { user: payload, error: null };
}

export function requireAuth(request: NextRequest, requireAdmin: boolean = false): {
  user: JWTPayload | null;
  error: string | null;
  status: number;
} {
  const { user, error } = authenticate(request);

  if (error || !user) {
    return { user: null, error: error || 'Unauthorized', status: 401 };
  }

  if (requireAdmin && user.role !== 'admin') {
    return { user: null, error: 'Admin access required', status: 403 };
  }

  return { user, error: null, status: 200 };
}

