import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const ForumsSchema = new mongoose.Schema({
  category: { type: Schema.Types.ObjectId, required: true, ref: 'categories' },
  creator: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  question: {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  reply: [
    {
      text: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      status: { type: Number, required: true, default: 0 },
      createdAt: { type: Date, required: true, default: Date.now() }
    }
  ],
  status: { type: Number, required: true, default: 0 },
  like: { type: Number, required: true, default: 0 },
});

ForumsSchema.plugin(paginate);
ForumsSchema.plugin(require('mongoose-timestamp'));

const ForumModel = mongoose.model('forums', ForumsSchema);

export default ForumModel;