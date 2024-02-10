import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

CategorySchema.plugin(paginate);
CategorySchema.plugin(require('mongoose-timestamp'));

const CategoryModel = mongoose.model('categories', CategorySchema);

export default CategoryModel;