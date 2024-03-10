import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const FileSchema = new mongoose.Schema({
  fieldName: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: String, required: true },
  fileName: { type: String, required: true },
  isPublic: { type: Boolean, required: true, default: true },
  creator: { type: Schema.Types.ObjectId, required: false }
});

FileSchema.plugin(paginate);
FileSchema.plugin(require('mongoose-timestamp'));

const fileModel = mongoose.model('files', FileSchema);

export default fileModel;