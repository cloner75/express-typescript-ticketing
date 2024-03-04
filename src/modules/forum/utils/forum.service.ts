import ForumModel from '../schema/forum.schema';
import MongoQuery from '../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class ForumService extends UserService {
  constructor() {
    super();
  }

  async createForumPublic(inputData: any) {
    try {
      const newForum = await ForumModel.create(inputData);
      return responser.serviceResponse(true, 'isOK', newForum);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create forum');
    }
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createForum(inputData: any, creator: string): Promise<any> {
    try {
      const newForum = await ForumModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newForum);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create forum');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getForum(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'forum');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await ForumModel.find(where, projection, otherOptions);
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get forums');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getForumById(id: string) {
    console.log("🚀 ~ ForumService ~ getForumById ~ id:", id);
    try {
      const findOneForum = await ForumModel.findOne({ _id: id });
      if (!findOneForum) {
        return responser.serviceResponse(false, 'forum not found');
      }
      return responser.serviceResponse(true, 'isOK', findOneForum);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get forum');
    }
  }

  async updateForumById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await ForumModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'forum not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update forum');
    }
  }



  async removeForumById(id: string) {
    try {
      const updateFields = await ForumModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'forum not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove forum');
    }
  }
}

export default ForumService;