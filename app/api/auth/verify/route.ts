import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production');

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify JWT token
    await jwtVerify(token, JWT_SECRET);

    return NextResponse.json({
      success: true,
      message: 'Token is valid',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid or expired token',
      },
      { status: 401 }
    );
  }
}
