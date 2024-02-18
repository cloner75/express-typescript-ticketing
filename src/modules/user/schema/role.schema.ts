import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const RoleSchema = new mongoose.Schema({
  name: { required: true, type: String },
  nameFa: { required: true, type: String },
  creator: { required: true, type: mongoose.Schema.Types.ObjectId },
});

RoleSchema.plugin(paginate);
RoleSchema.plugin(require('mongoose-timestamp'));

const RoleModel = mongoose.model('roles', RoleSchema);

export default RoleModel;