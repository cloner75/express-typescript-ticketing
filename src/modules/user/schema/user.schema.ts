import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { USER_ROLES } from './../interface/role.interface';

const UserSchema = new mongoose.Schema({
  username: { required: true, type: String },
  password: { required: true, type: String },
  salt: { required: true, type: String },
  phone: { required: false, type: String },
  email: { required: false, type: String },
  role: { required: true, type: String, enum: USER_ROLES },
});

UserSchema.plugin(paginate);
UserSchema.plugin(require('mongoose-timestamp'));

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;