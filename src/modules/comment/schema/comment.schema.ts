import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  commentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true },
});

CommentSchema.plugin(paginate);
CommentSchema.plugin(require('mongoose-timestamp'));

const CommentModel = mongoose.model('comments', CommentSchema);

export default CommentModel;