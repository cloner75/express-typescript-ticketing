import CommentModel from './../schema/comment.schema';
import MongoQuery from './../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class CommentService extends UserService {
  constructor() {
    super();
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createComment(inputData: any, creator: string): Promise<any> {
    try {
      const newComment = await CommentModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newComment);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create comment');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getComment(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'comment');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await CommentModel.find(where, projection, otherOptions);
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get comments');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getCommentById(id: string) {
    try {
      const findOneComment = await CommentModel.findOne({ _id: id });
      if (!findOneComment) {
        return responser.serviceResponse(false, 'comment not found');
      }
      return responser.serviceResponse(true, 'isOK', findOneComment);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get comment');
    }
  }

  async updateCommentById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await CommentModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'comment not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update comment');
    }
  }



  async removeCommentById(id: string) {
    try {
      const updateFields = await CommentModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'comment not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove comment');
    }
  }
}

export default CommentService;