import ProductModel from './../schema/product.schema';
import MongoQuery from './../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class ProductService extends UserService {
  constructor() {
    super();
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createProduct(inputData: any, creator: string): Promise<any> {
    try {
      const newProduct = await ProductModel.create({
        ...inputData,
        slug: inputData.slug.replaceAll(' ', '-'),
        creator
      });
      return responser.serviceResponse(true, 'isOK', newProduct);
    } catch (err: any) {
      console.log("🚀 ~ ProductService ~ createProduct ~ err:", err);
      return responser.serviceResponse(false, 'can not create product');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getProduct(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'product');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await ProductModel
        .find(where, projection, { ...otherOptions })
        .populate(['categoryId', 'brandId', 'creator']);
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      console.log("🚀 ~ ProductService ~ getProduct ~ err:", err);
      return responser.serviceResponse(false, 'can not get products');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getProductById(id: string) {
    try {
      const findOneProduct = await ProductModel.findOne({ _id: id });
      if (!findOneProduct) {
        return responser.serviceResponse(false, 'product not found');
      }
      return responser.serviceResponse(true, 'isOK', findOneProduct);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get product');
    }
  }

  async updateProductById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await ProductModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'product not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update product');
    }
  }



  async removeProductById(id: string) {
    try {
      const updateFields = await ProductModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'product not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove product');
    }
  }
}

export default ProductService;