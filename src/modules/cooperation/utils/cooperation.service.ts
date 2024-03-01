import CooperationModel from '../schema/cooperation.schema';
import MongoQuery from '../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class CooperationService extends UserService {
  constructor() {
    super();
  }

  async createCooperationPublic(inputData: any) {
    try {
      const newCooperation = await CooperationModel.create(inputData);
      return responser.serviceResponse(true, 'isOK', newCooperation);
    } catch (err: any) {
      console.log("🚀 ~ CooperationService ~ createCooperation ~ err:", err)
      return responser.serviceResponse(false, 'can not create cooperation');
    }
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createCooperation(inputData: any, creator: string): Promise<any> {
    try {
      const newCooperation = await CooperationModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newCooperation);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create cooperation');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getCooperation(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'cooperation');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await CooperationModel.find(where, projection, otherOptions);
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get cooperations');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getCooperationById(id: string) {
    console.log("🚀 ~ CooperationService ~ getCooperationById ~ id:", id);
    try {
      const findOneCooperation = await CooperationModel.findOne({ _id: id });
      if (!findOneCooperation) {
        return responser.serviceResponse(false, 'cooperation not found');
      }
      return responser.serviceResponse(true, 'isOK', findOneCooperation);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get cooperation');
    }
  }

  async updateCooperationById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await CooperationModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'cooperation not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update cooperation');
    }
  }



  async removeCooperationById(id: string) {
    try {
      const updateFields = await CooperationModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'cooperation not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove cooperation');
    }
  }
}

export default CooperationService;