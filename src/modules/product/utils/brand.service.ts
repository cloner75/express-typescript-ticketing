import BrandModel from './../schema/brand.schema';
import MongoQuery from './../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class BrandService extends UserService {
  constructor() {
    super();
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createBrand(inputData: any, creator: string): Promise<any> {
    try {
      const newBrand = await BrandModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newBrand);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create brand');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getBrand(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'brand');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await BrandModel.find(where, projection, otherOptions);
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get brands');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getBrandById(id: string) {
    try {
      const findOneBrand = await BrandModel.findOne({ _id: id });
      if (!findOneBrand) {
        return responser.serviceResponse(false, 'brand not found');
      }
      return responser.serviceResponse(true, 'isOK', findOneBrand);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get brand');
    }
  }

  async updateBrandById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await BrandModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'brand not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update brand');
    }
  }



  async removeBrandById(id: string) {
    try {
      const updateFields = await BrandModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'brand not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove brand');
    }
  }
}

export default BrandService;