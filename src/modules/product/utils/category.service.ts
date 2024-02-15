import CategoryModel from './../schema/category.schema';
import MongoQuery from './../../../helpers/mongo.query';
import responser from '../../../helpers/response';

class CategoryService {
  #MongoHelper: any;
  constructor() {
    this.#MongoHelper = MongoQuery;
  }

  async createCategory(inputData: any, creator: string): Promise<any> {
    try {
      const newCategory = await CategoryModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newCategory);
    } catch (err) {
      return responser.serviceResponse(false, 'can not create category');
    }
  }

  async getCategory(inputWhere: any): Promise<any> {
    try {
      const { options, where } = this.#MongoHelper.initialMongoQuery(inputWhere);
      const getCategories = await CategoryModel.find(where, options);
      return responser.serviceResponse(true, 'isOK', getCategories);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get categories');
    }
  }

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

  async updateCategoryById(id: string, updatedFields: any) {
    try {
      const updateFields = await CategoryModel.updateOne({ _id: id }, { $set: updatedFields });
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
      if (!updateFields || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'category not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove category');
    }
  }
}

export default CategoryService;