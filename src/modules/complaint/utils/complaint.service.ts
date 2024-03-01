import ComplaintModel from '../schema/complaint.schema';
import MongoQuery from '../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class ComplaintService extends UserService {
  constructor() {
    super();
  }

  async createComplaintPublic(inputData: any) {
    try {
      const newComplaint = await ComplaintModel.create(inputData);
      return responser.serviceResponse(true, 'isOK', newComplaint);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create complaint');
    }
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createComplaint(inputData: any, creator: string): Promise<any> {
    try {
      const newComplaint = await ComplaintModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newComplaint);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create complaint');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getComplaint(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'complaint');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await ComplaintModel.find(where, projection, otherOptions);
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get complaints');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getComplaintById(id: string) {
    try {
      const findOneComplaint = await ComplaintModel.findOne({ _id: id });
      if (!findOneComplaint) {
        return responser.serviceResponse(false, 'complaint not found');
      }
      return responser.serviceResponse(true, 'isOK', findOneComplaint);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get complaint');
    }
  }

  async updateComplaintById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await ComplaintModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'complaint not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update complaint');
    }
  }



  async removeComplaintById(id: string) {
    try {
      const updateFields = await ComplaintModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'complaint not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove complaint');
    }
  }
}

export default ComplaintService;