import OptionModel from './../schema/option.schema';
import MongoQuery from './../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class OptionService extends UserService {
  constructor() {
    super();
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createOption(inputData: any, creator: string): Promise<any> {
    try {
      const newOption = await OptionModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newOption);
    } catch (err: any) {
      console.log("🚀 ~ OptionService ~ createOption ~ err:", err)
      return responser.serviceResponse(false, 'can not create option');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getOption(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'option');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await OptionModel.find(where, projection, otherOptions);
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get options');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getOptionById(id: string) {
    try {
      const findOneOption = await OptionModel.findOne({ _id: id });
      if (!findOneOption) {
        return responser.serviceResponse(false, 'option not found');
      }
      return responser.serviceResponse(true, 'isOK', findOneOption);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get option');
    }
  }

  async updateOptionById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await OptionModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'option not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update option');
    }
  }



  async removeOptionById(id: string) {
    try {
      const updateFields = await OptionModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'option not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove option');
    }
  }
}

export default OptionService;