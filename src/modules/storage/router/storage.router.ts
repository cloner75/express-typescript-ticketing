import { Router } from 'express';
import Storage from '../controller/storage.controller';
import Validator from '../../../helpers/validator';
import { showPublicFile } from '../interface/validate.joi';
import authorization from '../../../helpers/authorization';
import RoleBase from '../../../helpers/role';
import { storage } from '../../../configs/permissions';
import path from 'path';
import multer from 'multer';

const imageMimeType = ['image/png', 'image/jpg', 'image/jpeg'];
const videoMimeType = ['video/mpg', 'video/mpeg', 'video/mp4'];
// const docsMimeType = ['application/pdf'];

const uploadImage = multer({
  dest: path.join(__dirname, './../uploads'),
  fileFilter: (_req, file, cb) => {
    if (imageMimeType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});


const uploadVideo = multer({
  dest: path.join(__dirname, './../uploads'),
  fileFilter: (_req, file, cb) => {
    if (videoMimeType.includes(file.mimetype)) {
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
  uploadImage.single('avatar'),
  StorageController.uploadImage
);

router.post('/blog/image',
  authorization.authorization,
  role.access(storage.blog),
  uploadImage.single('blog'),
  StorageController.uploadImage
);

router.post('/blog/video',
  authorization.authorization,
  role.access(storage.blog),
  uploadVideo.single('blog'),
  StorageController.uploadVideo
);

router.post('/product/image',
  authorization.authorization,
  role.access(storage.product),
  uploadVideo.single('product'),
  StorageController.uploadImage
);

// shekayat
router.post('/complaint',
  uploadImage.array('complaint', 10),
  StorageController.uploadImages
);

// nazar sangi
router.post('/survey',
  uploadImage.array('survey', 10),
  StorageController.uploadImages
);

// sabeghe kar
router.post('/cooperation',
  uploadImage.array('cooperation', 10),
  StorageController.uploadImages
);

router.post('/ticket',
  uploadImage.array('ticket', 10),
  StorageController.uploadImages
);


router.get('/show/public/:file',
  validate.validate(showPublicFile, 'GET'),
  StorageController.showPublicFile
);

export default router;