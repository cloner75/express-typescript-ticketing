import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const ComplaintSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  nationalCode: { type: String, required: true },
  phone: { type: String, required: true },
  postCode: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true },
  model: { type: String, required: true },
  warrantyId: { type: String, required: true },
  warrantyExpireTime: { type: Date, required: true },
  warrantyImg: { type: String, required: true },
  invoiceImg: { type: String, required: true },
  description: { type: String, required: true },
  TimeOfOccurrence: { type: String, required: true },
  describeProduct: { type: String, required: true },
  request: { type: String, required: true },
  documents: { type: Array, required: true },
  creator: { type: Schema.Types.ObjectId, required: false }
});

ComplaintSchema.plugin(paginate);
ComplaintSchema.plugin(require('mongoose-timestamp'));

const OptionModel = mongoose.model('complaints', ComplaintSchema);

export default OptionModel;