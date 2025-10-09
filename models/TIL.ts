import mongoose from 'mongoose';

const TILSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String },
  tags: [{ type: String }],
  codeSnippet: { type: String },
  codeLanguage: { type: String },
  officialDocsUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
 
});

export default mongoose.models.TIL || mongoose.model('TIL', TILSchema);
