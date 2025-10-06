import mongoose from 'mongoose';

const ReactionSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },
  clap: { type: Number, default: 0 },
  love: { type: Number, default: 0 },
  fire: { type: Number, default: 0 },
  thinking: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

// Add index for faster queries
ReactionSchema.index({ projectId: 1 });

export default mongoose.models.Reaction || mongoose.model('Reaction', ReactionSchema);
