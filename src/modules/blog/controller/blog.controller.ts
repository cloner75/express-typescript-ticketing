import { Request, Response } from 'express';
import BlogService from '../utils/blog.service';

import Responser from '../../../helpers/response';
import httpStatus from 'http-status';


class BlogController extends BlogService {
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
    const sendResponse = new Responser(res, 'blog-create');
    try {
      const { email, _id: creator } = req.user;
      const getUser = await super.getUserByEmail(email);
      if (!getUser.success) {
        return sendResponse.success(false, httpStatus.OK, httpStatus['204_MESSAGE'], {
          message: 'user not found'
        });
      }

      const getNewBlog = await super.createBlog(req.body, creator);
      if (!getNewBlog.success) {
        return sendResponse.success(false, httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], {
          message: getNewBlog.message
        });
      }
      return sendResponse.success(true, httpStatus.CREATED, httpStatus['201_MESSAGE'], getNewBlog.data);
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
    const sendResponse = new Responser(res, 'blog-find');
    try {
      const getBlogs = await super.getBlog(req.query);
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], getBlogs.data);
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
  async publicFindBySlug(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'blog-publicFindBySlug');
    try {
      const getBlog = await super.getBlogBySlug(req.params.slug);
      if (!getBlog.success) {
        return sendResponse.success(false, httpStatus.NO_CONTENT, httpStatus['204_MESSAGE'], getBlog.message);
      }
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], getBlog.data);
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
    const sendResponse = new Responser(res, 'blog-findOne');
    try {
      const getBlog = await super.getBlogById(req.params.id);
      if (!getBlog.success) {
        return sendResponse.success(false, httpStatus.NO_CONTENT, httpStatus['204_MESSAGE'], getBlog.message);
      }
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], getBlog.data);
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
    const sendResponse = new Responser(res, 'blog-create');
    try {
      const { email, _id: creator } = req.user;
      const getUser = await super.getUserByEmail(email);
      if (!getUser.success) {
        return sendResponse.success(false, httpStatus.OK, httpStatus['204_MESSAGE'], {
          message: 'user not found'
        });
      }

      const getNewBlog = await super.updateBlogById(req.params.id, req.body, creator);
      if (!getNewBlog.success) {
        return sendResponse.success(false, httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], {
          message: getNewBlog.message
        });
      }
      return sendResponse.success(true, httpStatus.CREATED, httpStatus['201_MESSAGE'], getNewBlog.data);
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
    const sendResponse = new Responser(res, 'blog-delete');
    try {
      const removeBlog = await super.removeBlogById(req.params.id);
      if (!removeBlog.success) {
        return sendResponse.success(false, httpStatus.NO_CONTENT, httpStatus['204_MESSAGE'], removeBlog.message);
      }
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], removeBlog.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }
}

export default BlogController;