import ContactUsModel from './../schema/contactus.schema';
import MongoQuery from './../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class ContactUsService extends UserService {
  constructor() {
    super();
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createContactUs(inputData: any, creator: string): Promise<any> {
    try {
      const newContactUs = await ContactUsModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newContactUs);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create contactUs');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getContactUs(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'contactUs');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await ContactUsModel.find(where, projection, otherOptions);
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get contactUss');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getContactUsById(id: string) {
    try {
      const findOneContactUs = await ContactUsModel.findOne({ _id: id });
      if (!findOneContactUs) {
        return responser.serviceResponse(false, 'contactUs not found');
      }
      return responser.serviceResponse(true, 'isOK', findOneContactUs);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get contactUs');
    }
  }

  async updateContactUsById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await ContactUsModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'contactUs not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update contactUs');
    }
  }



  async removeContactUsById(id: string) {
    try {
      const updateFields = await ContactUsModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'contactUs not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove contactUs');
    }
  }
}

export default ContactUsService;