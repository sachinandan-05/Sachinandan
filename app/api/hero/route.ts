import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hero from '@/models/Hero';

export async function GET() {
  try {
    await connectDB();
    const hero = await Hero.findOne({}).sort({ updatedAt: -1 });
    return NextResponse.json({ success: true, data: hero });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    // Delete existing hero and create new one
    await Hero.deleteMany({});
    const hero = await Hero.create(body);
    return NextResponse.json({ success: true, data: hero }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    let hero = await Hero.findOne({});
    if (!hero) {
      hero = await Hero.create(body);
    } else {
      hero = await Hero.findByIdAndUpdate(
        hero._id,
        { ...body, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
    }
    return NextResponse.json({ success: true, data: hero });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
