import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const ContactUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

ContactUsSchema.plugin(paginate);
ContactUsSchema.plugin(require('mongoose-timestamp'));

const ContactUsModel = mongoose.model('contactUs', ContactUsSchema);

export default ContactUsModel;