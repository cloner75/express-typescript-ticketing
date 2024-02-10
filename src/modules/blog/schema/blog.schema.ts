import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const BlogSchema = new mongoose.Schema({
  content: { type: String, required: true },
  title: { type: String, required: true },
  slugs: { type: String, required: true },
  image: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true },
});

BlogSchema.plugin(paginate);
BlogSchema.plugin(require('mongoose-timestamp'));

const BlogModel = mongoose.model('blogs', BlogSchema);

export default BlogModel;