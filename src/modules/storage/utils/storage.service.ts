import StorageModel from '../schema/storage.schema';
import MongoQuery from '../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class StorageService extends UserService {
  constructor() {
    super();
  }

  async createPublicImage(inputData: any, creator: string) {
    try {
      const newStorage = await StorageModel.create({
        fieldName: inputData.fieldname,
        originalName: inputData.originalname,
        mimeType: inputData.mimetype,
        size: inputData.size,
        fileName: inputData.filename,
        isPublic: true,
        creator
      });
      return responser.serviceResponse(true, 'isOK', newStorage);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create file');
    }
  }

  async createPublicVideo(inputData: any, creator: string) {
    try {
      const newStorage = await StorageModel.create({
        fieldName: inputData.fieldname,
        originalName: inputData.originalname,
        mimeType: inputData.mimetype,
        size: inputData.size,
        fileName: inputData.filename,
        isPublic: true,
        creator
      });
      return responser.serviceResponse(true, 'isOK', newStorage);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create file');
    }
  }

  async createPrivateImages(inputDatas: any) {
    try {
      let createdData = inputDatas.map((item: any) => {
        return {
          fieldName: item.fieldname,
          originalName: item.originalname,
          mimeType: item.mimetype,
          size: item.size,
          fileName: item.filename,
          isPublic: false,
        };
      });

      const newStorage = await StorageModel.create(createdData);
      return responser.serviceResponse(true, 'isOK', newStorage);
    } catch (err: any) {
      console.log("🚀 ~ StorageService ~ createAvatar ~ err:", err);
      return responser.serviceResponse(false, 'can not create file');
    }
  }

  async findFilePublic(fileName: string) {
    try {
      const checkFile = await StorageModel.findOne({ fileName, isPublic: true });
      if (!checkFile) {
        return responser.serviceResponse(false, 'file not found');
      }
      return responser.serviceResponse(true, 'isOK', checkFile);
    } catch (err: any) {
      console.log("🚀 ~ StorageService ~ createAvatar ~ err:", err);
      return responser.serviceResponse(false, 'can not create file');
    }
  }
}

export default StorageService;