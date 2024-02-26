import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const BlogSchema = new mongoose.Schema({
  content: { type: String, required: true },
  subContent: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  cover: { type: String, required: true },
  images: { type: Array, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true },
});

BlogSchema.plugin(paginate);
BlogSchema.plugin(require('mongoose-timestamp'));

const BlogModel = mongoose.model('blogs', BlogSchema);

export default BlogModel;