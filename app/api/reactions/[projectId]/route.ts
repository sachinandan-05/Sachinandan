import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Reaction from '@/models/Reaction';

// GET reactions for a specific project
export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    await connectDB();
    
    const { projectId } = params;
    
    // Find or create reaction document for this project
    let reaction = await Reaction.findOne({ projectId });
    
    if (!reaction) {
      // Create new reaction document with zero counts
      reaction = await Reaction.create({
        projectId,
        clap: 0,
        love: 0,
        fire: 0,
        thinking: 0,
      });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        clap: reaction.clap,
        love: reaction.love,
        fire: reaction.fire,
        thinking: reaction.thinking,
      },
    });
  } catch (error: any) {
    console.error('Get reactions error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST to add/remove a reaction
export async function POST(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    await connectDB();
    
    const { projectId } = params;
    const { reactionType, action } = await request.json(); // action: 'add' or 'remove'
    
    // Validate reaction type
    const validReactions = ['clap', 'love', 'fire', 'thinking'];
    if (!validReactions.includes(reactionType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid reaction type' },
        { status: 400 }
      );
    }
    
    // Find or create reaction document
    let reaction = await Reaction.findOne({ projectId });
    
    if (!reaction) {
      reaction = await Reaction.create({
        projectId,
        clap: 0,
        love: 0,
        fire: 0,
        thinking: 0,
      });
    }
    
    // Update the count based on action
    if (action === 'add') {
      reaction[reactionType] = (reaction[reactionType] || 0) + 1;
    } else if (action === 'remove') {
      reaction[reactionType] = Math.max((reaction[reactionType] || 0) - 1, 0);
    }
    
    reaction.updatedAt = new Date();
    await reaction.save();
    
    return NextResponse.json({
      success: true,
      data: {
        clap: reaction.clap,
        love: reaction.love,
        fire: reaction.fire,
        thinking: reaction.thinking,
      },
    });
  } catch (error: any) {
    console.error('Update reaction error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
