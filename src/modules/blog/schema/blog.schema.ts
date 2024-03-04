import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const BlogSchema = new mongoose.Schema({
  content: { type: String, required: true },
  subContent: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  image: { type: String, required: true },
  video: { type: String, required: false },
  type: { type: String, required: true, default: 'blog' },
  countView: { type: Number, required: true, default: 0 },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true },
});

BlogSchema.plugin(paginate);
BlogSchema.plugin(require('mongoose-timestamp'));

const BlogModel = mongoose.model('blogs', BlogSchema);

export default BlogModel;