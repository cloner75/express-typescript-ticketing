import { Request, Response } from 'express';
import StorageService from '../utils/storage.service';

import Responser from '../../../helpers/response';
import httpStatus from 'http-status';
import fs from 'fs';
import path from 'path';

class StorageController extends StorageService {
  constructor() {
    super();
  }

  async uploadAvatar(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'storage-create');
    try {
      if (!req.file) {
        return sendResponse.success(false, httpStatus.BAD_REQUEST, httpStatus['400_MESSAGE'], {
          message: 'avatar is required and image'
        });
      }
      const { email, _id: creator } = req.user;
      const getUser = await super.getUserByEmail(email);
      if (!getUser.success) {
        return sendResponse.success(false, httpStatus.OK, httpStatus['204_MESSAGE'], {
          message: 'user not found'
        });
      }

      const getNewStorage = await super.createAvatar(req.file, creator);
      if (!getNewStorage.success) {
        return sendResponse.success(false, httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], {
          message: getNewStorage.message
        });
      }
      return sendResponse.success(true, httpStatus.CREATED, httpStatus['201_MESSAGE'], getNewStorage.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }

  async showPublicFile(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'storage-show-public');
    try {
      const findFile = await super.findFilePublic(req.params.file);
      if (!findFile.success) {
        return sendResponse.success(false, httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], {
          message: findFile.message
        });
      }
      const getFile = fs.createReadStream(path.join(__dirname, `./../uploads/${req.params.file}`));
      res.writeHead(200, {
        'Content-Type': findFile.data.mimeType,
      });
      getFile.pipe(res);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }
}

export default StorageController;