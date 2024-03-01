import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const CooperationSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  nationalCode: { type: String, required: true },
  father: { type: String, required: true },
  birthPlace: { type: String, required: true },
  placeOfIssue: { type: String, required: true },
  birthday: { type: Date, required: true },
  nationality: { type: String, required: true },
  religion: { type: String, required: true },
  isMarriage: { type: Boolean, required: true },
  Housing: { type: String, required: true },
  spouseWorkplace: { type: String, required: true },
  wifePhone: { type: String, required: true },
  wifeMobile: { type: String, required: true },
  houseAddress: { type: String, required: true },
  degreeOfEducation: { type: String, required: true },
  degreeTime: { type: Date, required: true },
  courses: { type: String, required: true },
  langs: { type: String, required: true },
  guarantee: { type: Boolean, required: true },
  requestJob: { type: String, required: true },
  requestSalary: { type: String, required: true },
  startedDate: { type: String, required: true },
  iq: { type: Number, required: true },
  memory: { type: Number, required: true },
  responsibility: { type: Number, required: true },
  followUp: { type: Number, required: true },
  discipline: { type: Number, required: true },
  conscience: { type: Number, required: true },
  respect: { type: Number, required: true },
  vision: { type: String, required: true },
  visionDescribe: { type: String, required: true },
  firstWorkDate: { type: Date, required: true },
  insuranceNumber: { type: String, required: true },
  companyName: { type: String, required: true },
  post: { type: String, required: true },
  lastSalary: { type: String, required: true },
  employersPhone: { type: String, required: true },
  reasonLiving: { type: String, required: true },
  atDateWork: { type: String, required: true },
  untilDateWork: { type: String, required: true },
  

  creator: { type: Schema.Types.ObjectId, required: false }
});

CooperationSchema.plugin(paginate);
CooperationSchema.plugin(require('mongoose-timestamp'));

const SurvayModel = mongoose.model('cooperation', CooperationSchema);

export default SurvayModel;