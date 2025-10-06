import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TIL from '@/models/TIL';

export async function GET() {
  try {
    await connectDB();
    const tils = await TIL.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tils });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const til = await TIL.create(body);
    return NextResponse.json({ success: true, data: til }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
