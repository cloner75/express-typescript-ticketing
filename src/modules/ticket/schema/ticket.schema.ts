import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const TicketSchema = new mongoose.Schema({
  status: { required: true, type: Number, default: 1, enum: [] },
  subject: { required: true, type: String },
  request: { required: true, type: String },
  customerId: { required: true, type: mongoose.Schema.Types.ObjectId },
  seen: { required: true, type: Boolean, default: false },
  responses: [{
    text: { required: true, type: String },
    sender: { required: true, type: mongoose.Schema.Types.ObjectId },
    type: { required: true, type: Number, enum: [] },
    createdAt: { required: true, type: Date, default: Date.now() },
    seen: { required: true, type: Boolean, default: false }
  }]
});

TicketSchema.plugin(paginate);
TicketSchema.plugin(require('mongoose-timestamp'));

const TicketModel = mongoose.model('tickets', TicketSchema);

export default TicketModel;