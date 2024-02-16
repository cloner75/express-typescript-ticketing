import BlogModel from './../schema/blog.schema';
import MongoQuery from './../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class BlogService extends UserService {
  constructor() {
    super();
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createBlog(inputData: any, creator: string): Promise<any> {
    try {
      const newBlog = await BlogModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newBlog);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create blog');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getBlog(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'blog');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await BlogModel.find(where, projection, otherOptions);
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get blogs');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getBlogById(id: string) {
    try {
      const findOneBlog = await BlogModel.findOne({ _id: id });
      if (!findOneBlog) {
        return responser.serviceResponse(false, 'blog not found');
      }
      return responser.serviceResponse(true, 'isOK', findOneBlog);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get blog');
    }
  }

  async updateBlogById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await BlogModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'blog not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update blog');
    }
  }



  async removeBlogById(id: string) {
    try {
      const updateFields = await BlogModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'blog not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove blog');
    }
  }
}

export default BlogService;