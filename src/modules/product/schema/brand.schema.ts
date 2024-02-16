import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true }
});

BrandSchema.plugin(paginate);
BrandSchema.plugin(require('mongoose-timestamp'));

const BrandModel = mongoose.model('brands', BrandSchema);

export default BrandModel;