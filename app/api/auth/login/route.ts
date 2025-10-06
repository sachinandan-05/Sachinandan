import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'your_secret_admin_key_change_this';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production');

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Validate password
    if (password === ADMIN_SECRET) {
      // Create JWT token
      const token = await new SignJWT({ admin: true })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d') // Token valid for 7 days
        .sign(JWT_SECRET);

      return NextResponse.json({
        success: true,
        token,
        message: 'Login successful',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid password',
        },
        { status: 401 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Authentication failed',
      },
      { status: 500 }
    );
  }
}
