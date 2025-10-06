import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TIL from '@/models/TIL';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const til = await TIL.findById(params.id);
    if (!til) {
      return NextResponse.json({ success: false, error: 'TIL not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: til });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const til = await TIL.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    if (!til) {
      return NextResponse.json({ success: false, error: 'TIL not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: til });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const til = await TIL.findByIdAndDelete(params.id);
    if (!til) {
      return NextResponse.json({ success: false, error: 'TIL not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
