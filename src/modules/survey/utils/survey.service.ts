import SurveyModel from '../schema/survey.schema';
import MongoQuery from '../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class SurveyService extends UserService {
  constructor() {
    super();
  }

  async createSurveyPublic(inputData: any) {
    try {
      const newSurvey = await SurveyModel.create(inputData);
      return responser.serviceResponse(true, 'isOK', newSurvey);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create survey');
    }
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createSurvey(inputData: any, creator: string): Promise<any> {
    try {
      const newSurvey = await SurveyModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newSurvey);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create survey');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getSurvey(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'survey');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await SurveyModel.find(where, projection, otherOptions);
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get surveys');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getSurveyById(id: string) {
    console.log("🚀 ~ SurveyService ~ getSurveyById ~ id:", id);
    try {
      const findOneSurvey = await SurveyModel.findOne({ _id: id });
      if (!findOneSurvey) {
        return responser.serviceResponse(false, 'survey not found');
      }
      return responser.serviceResponse(true, 'isOK', findOneSurvey);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get survey');
    }
  }

  async updateSurveyById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await SurveyModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'survey not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update survey');
    }
  }



  async removeSurveyById(id: string) {
    try {
      const updateFields = await SurveyModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'survey not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove survey');
    }
  }
}

export default SurveyService;