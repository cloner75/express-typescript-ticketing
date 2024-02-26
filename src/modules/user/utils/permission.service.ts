import PermissionModel from '../schema/permission.schema';
import MongoQuery from '../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from './user.service';


class PermissionService extends UserService {
  constructor() {
    super();
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createPermission(inputData: any, creator: string): Promise<any> {
    try {
      const newPermission = await PermissionModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newPermission);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create permission');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getPermission(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'permission');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await PermissionModel.find(where, projection, otherOptions);
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get permissions');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getPermissionById(id: string) {
    try {
      const findOnePermission = await PermissionModel.findOne({ _id: id });
      if (!findOnePermission) {
        return responser.serviceResponse(false, 'permission not found');
      }
      return responser.serviceResponse(true, 'isOK', findOnePermission);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get permission');
    }
  }

  /**
 * 
 * @param id 
 * @returns 
 */
  async getPermissionByName(name: string) {
    try {
      const findOnePermission = await PermissionModel.findOne({ name });
      if (!findOnePermission) {
        return responser.serviceResponse(false, 'permission not found');
      }
      return responser.serviceResponse(true, 'isOK', findOnePermission);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get permission');
    }
  }


  async updatePermissionById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await PermissionModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'permission not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update permission');
    }
  }



  async removePermissionById(id: string) {
    try {
      const updateFields = await PermissionModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'permission not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove permission');
    }
  }
}

export default PermissionService;