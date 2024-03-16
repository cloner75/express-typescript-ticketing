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
      const createdData = {
        category: inputData.categoryId,
        creator,
        question: {
          title: inputData.title,
          content: inputData.content,
        },
        reply: [],
        status: 0,
        like: 0,
      };
      const newForum = await ForumModel.create(createdData);
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
  async createReply(inputData: any): Promise<any> {
    try {
      const { forumId: _id, ...otherDatas } = inputData;
      const getForum = await ForumModel.findOne({ _id });
      if (!getForum) {
        return responser.serviceResponse(false, 'forum not found');
      }

      const newReply = await ForumModel.updateOne({ _id }, {
        $push: {
          reply: {
            ...otherDatas,
            createdAt: Date.now(),
            status: 0,
            like: 0
          }
        }
      });
      return responser.serviceResponse(true, 'isOK', newReply);
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

  /**
   * 
   * @param id 
   * @param updatedFields 
   * @param creator 
   * @returns 
   */
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



  /**
   * 
   * @param id 
   * @param updatedFields 
   * @param creator 
   * @returns 
   */
  async updateForumReplyStatusById(id: string, replyId: string, status: number) {
    console.log("🚀 ~ ForumService ~ updateForumReplyStatusById ~ replyId:", replyId);
    console.log("🚀 ~ ForumService ~ updateForumReplyStatusById ~ status:", status);
    try {
      const findForum = await ForumModel.findOne({ _id: id });
      if (!findForum) {
        return responser.serviceResponse(false, 'forum not found');
      }

      const findIndexReply = findForum.reply.findIndex(item => item._id?.toString() === replyId);

      if (findIndexReply === -1) {
        return responser.serviceResponse(false, 'reply not found');
      }

      let replies = findForum.reply;
      replies[findIndexReply].status = status;
      console.log("🚀 ~ ForumService ~ updateForumReplyStatusById ~ replies[findIndexReply]:", replies[findIndexReply])
      const updateFields = await ForumModel.updateOne({ _id: id }, { $set: { reply: replies } });
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      console.log("🚀 ~ ForumService ~ updateForumReplyStatusById ~ err:", err);
      return responser.serviceResponse(false, 'can not update forum');
    }
  }



  /**
 * 
 * @param id 
 * @param replyId
 * @param updatedFields 
 * @param creator 
 * @returns 
 */
  async updateForumLikeById(id: string, replyId: string, like: any, creator: string) {
    try {
      const findForum = await ForumModel.findOne({ _id: id });
      if (!findForum) {
        return responser.serviceResponse(false, 'forum not found');
      }
      const findReply = findForum.reply.findIndex(item => {
        if (item._id?.toString() === replyId) {
          return item;
        }
      });
      if (findReply === -1) {
        return responser.serviceResponse(false, 'comment not found');
      }
      const findLiker = findForum.reply[findReply].likers.findIndex(item => item.user?.toString() === creator);

      let replies = findForum.reply;

      let update = {
        updated: false
      };

      if (findLiker === -1) {
        if (like === true) {
          replies[findReply].likers.push({
            user: creator,
            like
          });
          update = { updated: true };
          await ForumModel.updateOne({ _id: id }, {
            $set: {
              reply: replies,
              like: ++findForum.like
            }
          });
        }
      } else {
        if (findForum.reply[findReply].likers[findLiker].like !== like) {
          let resultLike = findForum.like;
          if (like === true) {
            replies[findReply].likers[findLiker].like = true;
            resultLike++;
          } else {
            replies[findReply].likers[findLiker].like = false;
            resultLike--;
          }
          update = { updated: true };
          await ForumModel.updateOne({ _id: id }, {
            $set: {
              reply: replies,
              like: resultLike
            }
          });
        }
      }

      return responser.serviceResponse(true, 'isOK', update);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update forum');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
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