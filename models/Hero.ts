import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  social: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    email: { type: String },
  },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);
