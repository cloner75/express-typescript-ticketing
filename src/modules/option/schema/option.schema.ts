import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const OptionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  values: { type: mongoose.Schema.Types.Mixed, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true }
});

OptionSchema.plugin(paginate);
OptionSchema.plugin(require('mongoose-timestamp'));

const OptionModel = mongoose.model('options', OptionSchema);

export default OptionModel;