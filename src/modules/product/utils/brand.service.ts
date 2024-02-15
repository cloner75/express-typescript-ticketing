import BrandModel from './../schema/brand.schema';
import MongoQuery from './../../../helpers/mongo.query';
import responser from '../../../helpers/response';

class BrandService {
  #MongoHelper: any;
  constructor() {
    this.#MongoHelper = MongoQuery;
  }

  async createBrand(inputData: any, creator: string): Promise<any> {
    try {
      const newBrand = await BrandModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newBrand);
    } catch (err) {
      return responser.serviceResponse(false, 'can not create brand');
    }
  }

  async getBrand(inputWhere: any): Promise<any> {
    try {
      const { options, where } = this.#MongoHelper.initialMongoQuery(inputWhere);
      const getCategories = await BrandModel.find(where, options);
      return responser.serviceResponse(true, 'isOK', getCategories);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get categories');
    }
  }

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

  async updateBrandById(id: string, updatedFields: any) {
    try {
      const updateFields = await BrandModel.updateOne({ _id: id }, { $set: updatedFields });
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
      if (!updateFields || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'brand not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove brand');
    }
  }
}

export default BrandService;