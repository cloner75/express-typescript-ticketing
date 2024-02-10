import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  slug: { type: String, required: true },
  colers: [{ type: String, required: true }],
  images: [{ type: String, required: true }],
  options: [{ type: String, title: String, status: Boolean }],
  brandId: { type: mongoose.Schema.Types.ObjectId, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true },
});

ProductSchema.plugin(paginate);
ProductSchema.plugin(require('mongoose-timestamp'));

const ProductModel = mongoose.model('products', ProductSchema);

export default ProductModel;