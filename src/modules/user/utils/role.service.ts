import RoleModel from './../schema/role.schema';
import MongoQuery from './../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class RoleService extends UserService {
  constructor() {
    super();
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createRole(inputData: any, creator: string): Promise<any> {
    try {
      const newRole = await RoleModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newRole);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create role');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getRole(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'role');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await RoleModel.find(where, projection, otherOptions);
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get roles');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getRoleById(id: string) {
    try {
      const findOneRole = await RoleModel.findOne({ _id: id });
      if (!findOneRole) {
        return responser.serviceResponse(false, 'role not found');
      }
      return responser.serviceResponse(true, 'isOK', findOneRole);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get role');
    }
  }

  async updateRoleById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await RoleModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'role not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update role');
    }
  }



  async removeRoleById(id: string) {
    try {
      const updateFields = await RoleModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'role not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove role');
    }
  }
}

export default RoleService;