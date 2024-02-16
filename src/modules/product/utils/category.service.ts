import CategoryModel from './../schema/category.schema';
import MongoQuery from './../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class CategoryService extends UserService {
  constructor() {
    super();
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createCategory(inputData: any, creator: string): Promise<any> {
    try {
      const newCategory = await CategoryModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newCategory);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create category');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getCategory(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'category');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await CategoryModel.find(where, projection, { ...otherOptions });
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get categorys');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getCategoryById(id: string) {
    try {
      const findOneCategory = await CategoryModel.findOne({ _id: id });
      if (!findOneCategory) {
        return responser.serviceResponse(false, 'category not found');
      }
      return responser.serviceResponse(true, 'isOK', findOneCategory);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get category');
    }
  }

  async updateCategoryById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await CategoryModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'category not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update category');
    }
  }



  async removeCategoryById(id: string) {
    try {
      const updateFields = await CategoryModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'category not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove category');
    }
  }
}

export default CategoryService;