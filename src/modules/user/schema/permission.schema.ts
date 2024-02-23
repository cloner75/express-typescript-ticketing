import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const PermissionSchema = new mongoose.Schema({
  roleId: { required: true, type: mongoose.Schema.Types.ObjectId },
  access: [
    {
      service: { required: true, type: String },
      methods: { required: true, type: Array }
    }
  ],
  creator: { required: false, type: mongoose.Schema.Types.ObjectId },
});

PermissionSchema.plugin(paginate);
PermissionSchema.plugin(require('mongoose-timestamp'));

const PermissionModel = mongoose.model('permissions', PermissionSchema);

export default PermissionModel;