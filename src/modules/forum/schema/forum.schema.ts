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
      text: { type: String, required: false },
      name: { type: String, required: false },
      email: { type: String, required: false },
      status: { type: Number, required: false, default: 0 },
      like: { type: Number, required: false, default: 0 },
      createdAt: { type: Date, required: false, default: Date.now() }
    }
  ],
  status: { type: Number, required: true, default: 0 },
  like: { type: Number, required: true, default: 0 },
});

ForumsSchema.plugin(paginate);
ForumsSchema.plugin(require('mongoose-timestamp'));

const ForumModel = mongoose.model('forums', ForumsSchema);

export default ForumModel;