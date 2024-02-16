import { Request, Response } from 'express';
import CommentService from '../utils/comment.service';

import Responser from '../../../helpers/response';
import httpStatus from 'http-status';


class CommentController extends CommentService {
  constructor() {
    super();
  }

  /**
   * 
   * @param req 
   * @param res 
   * @returns 
   */
  async create(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'comment-create');
    try {
      const { email, _id: creator } = req.user;
      const getUser = await super.getUserByEmail(email);
      if (!getUser.success) {
        return sendResponse.success(false, httpStatus.OK, httpStatus['204_MESSAGE'], {
          message: 'user not found'
        });
      }

      const getNewComment = await super.createComment(req.body, creator);
      if (!getNewComment.success) {
        return sendResponse.success(false, httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], {
          message: getNewComment.message
        });
      }
      return sendResponse.success(true, httpStatus.CREATED, httpStatus['201_MESSAGE'], getNewComment.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }

  /**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
  async find(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'comment-find');
    try {
      const getComments = await super.getComment(req.query);
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], getComments.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }


  /**
  * 
  * @param req 
  * @param res 
  * @returns 
  */
  async findOne(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'comment-findOne');
    try {
      const getComment = await super.getCommentById(req.params.id);
      if (!getComment.success) {
        return sendResponse.success(false, httpStatus.NO_CONTENT, httpStatus['204_MESSAGE'], getComment.message);
      }
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], getComment.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }

  /**
* 
* @param req 
* @param res 
* @returns 
*/
  async update(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'comment-create');
    try {
      const { email, _id: creator } = req.user;
      const getUser = await super.getUserByEmail(email);
      if (!getUser.success) {
        return sendResponse.success(false, httpStatus.OK, httpStatus['204_MESSAGE'], {
          message: 'user not found'
        });
      }

      const getNewComment = await super.updateCommentById(req.params.id, req.body, creator);
      if (!getNewComment.success) {
        return sendResponse.success(false, httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], {
          message: getNewComment.message
        });
      }
      return sendResponse.success(true, httpStatus.CREATED, httpStatus['201_MESSAGE'], getNewComment.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }


  /**
* 
* @param req 
* @param res 
* @returns 
*/
  async delete(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'comment-delete');
    try {
      const removeComment = await super.removeCommentById(req.params.id);
      if (!removeComment.success) {
        return sendResponse.success(false, httpStatus.NO_CONTENT, httpStatus['204_MESSAGE'], removeComment.message);
      }
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], removeComment.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }
}

export default CommentController;