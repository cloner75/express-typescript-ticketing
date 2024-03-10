import { Router } from 'express';
import Storage from '../controller/storage.controller';
import Validator from '../../../helpers/validator';
import { create, find, findOne, update, remove } from '../interface/validate.joi';
import authorization from '../../../helpers/authorization';
import RoleBase from '../../../helpers/role';
import { storage } from '../../../configs/permissions';
import path from 'path';
import multer from 'multer';
const toMB = (input: number) => input * 1000;
const avatarMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];


const uploadAvatar = multer({
  dest: path.join(__dirname, './../uploads'),
  fileFilter: (_req, file, cb) => {
    if (avatarMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

const validate = new Validator('storage_service');
const role = new RoleBase('storage');
const router = Router();

const StorageController = new Storage();

router.post('/avatar',
  authorization.authorization,
  role.access(storage.avatar),
  uploadAvatar.single('avatar'),
  StorageController.uploadAvatar
);

router.get('/show/public/:file',
  StorageController.showPublicFile
);

export default router;