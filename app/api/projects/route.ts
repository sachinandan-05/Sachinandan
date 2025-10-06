import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

// Enable caching for this route (revalidate every 60 seconds)
export const revalidate = 60;

// GET all projects
export async function GET() {
  try {
    // Connect to database with timeout
    await Promise.race([
      connectDB(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 8000)
      )
    ]);
    
    // Use lean() for faster queries and select only needed fields
    const projects = await Project.find({})
      .select('title description tech github live image featured')
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    
    return NextResponse.json({ 
      success: true, 
      data: projects 
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    });
  } catch (error: any) {
    console.error('Projects API Error:', error);
    
    // Return helpful error message
    const errorMessage = error.message.includes('IP')
      ? 'Database connection failed. Please whitelist your IP in MongoDB Atlas.'
      : error.message;
    
    return NextResponse.json({ 
      success: false, 
      error: errorMessage,
      hint: 'Check MongoDB Atlas Network Access settings'
    }, { status: 500 });
  }
}

// POST create new project
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
