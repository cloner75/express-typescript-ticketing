import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const SurveiesSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  nationalCode: { type: String, required: true },
  phone: { type: String, required: true },
  postCode: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  afterSalesService: { type: String, required: true },
  appropriateResponse: { type: String, required: true },
  speedOfResponding: { type: String, required: true },
  easeOfAccess: { type: String, required: true },
  quality: { type: String, required: true },
  timelySupply: { type: String, required: true },
  commitment: { type: Date, required: true },
  satisfaction: { type: String, required: true },
  usingTime: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, required: false }
});

SurveiesSchema.plugin(paginate);
SurveiesSchema.plugin(require('mongoose-timestamp'));

const SurvayModel = mongoose.model('surveies', SurveiesSchema);

export default SurvayModel;