import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Reaction from "@/models/Reaction";
import Project from "@/models/Project";

export async function GET() {
  try {
    await dbConnect();

    // Get all reactions sorted by most recent updates
    const reactions = await Reaction.find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .lean();

    // Get project details
    const projectIds = reactions.map(r => r.projectId);
    const projects = await Project.find({ _id: { $in: projectIds } })
      .select('title')
      .lean();

    // Create a map of project IDs to titles
    const projectMap = projects.reduce((acc: any, project: any) => {
      acc[project._id.toString()] = project.title;
      return acc;
    }, {});

    // Format activities
    const activities = [];
    const now = new Date();

    for (const reaction of reactions) {
      const projectTitle = projectMap[reaction.projectId] || "Unknown Project";
      const timeDiff = now.getTime() - new Date(reaction.updatedAt).getTime();
      const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
      const timeString = hoursAgo === 0 ? "Just now" : 
                        hoursAgo === 1 ? "1 hour ago" : 
                        `${hoursAgo} hours ago`;

      // Add activities for each reaction type that has changed
      const reactionTypes = [
        { key: 'clap', emoji: '👏', name: 'Clap' },
        { key: 'love', emoji: '😍', name: 'Love' },
        { key: 'fire', emoji: '🔥', name: 'Fire' },
        { key: 'thinking', emoji: '🤔', name: 'Thinking' }
      ];

      for (const type of reactionTypes) {
        const count = reaction[type.key];
        if (count > 0) {
          activities.push({
            type: "REACTION",
            project: projectTitle,
            action: "got new",
            time: timeString,
            emoji: type.emoji,
            reactions: count > 1 ? `x${count}` : undefined,
            timestamp: reaction.updatedAt
          });
        }
      }
    }

    // Sort by timestamp and limit to 10 most recent
    const sortedActivities = activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    return NextResponse.json({ success: true, data: sortedActivities });
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}
