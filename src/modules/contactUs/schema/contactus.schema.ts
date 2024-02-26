import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const ContactUsSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  phone: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: Number, required: true, default: 0 },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true },
});

ContactUsSchema.plugin(paginate);
ContactUsSchema.plugin(require('mongoose-timestamp'));

const ContactUsModel = mongoose.model('contactUs', ContactUsSchema);

export default ContactUsModel;