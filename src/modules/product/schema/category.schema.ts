import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sub: [
    {
      name: { type: String, required: false }
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  }
});

CategorySchema.plugin(paginate);
CategorySchema.plugin(require('mongoose-timestamp'));

const CategoryModel = mongoose.model('categories', CategorySchema);

export default CategoryModel;