import { Request, Response } from 'express';
import RoleService from '../utils/role.service';

import Responser from '../../../helpers/response';
import httpStatus from 'http-status';


class RoleController extends RoleService {
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
    const sendResponse = new Responser(res, 'role-create');
    try {
      const { email, _id: creator } = req.user;
      const getUser = await super.getUserByEmail(email);
      if (!getUser.success) {
        return sendResponse.success(false, httpStatus.OK, httpStatus['204_MESSAGE'], {
          message: 'user not found'
        });
      }

      const getNewRole = await super.createRole(req.body, creator);
      if (!getNewRole.success) {
        return sendResponse.success(false, httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], {
          message: getNewRole.message
        });
      }
      return sendResponse.success(true, httpStatus.CREATED, httpStatus['201_MESSAGE'], getNewRole.data);
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
    const sendResponse = new Responser(res, 'role-find');
    try {
      const getRoles = await super.getRole(req.query);
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], getRoles.data);
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
    const sendResponse = new Responser(res, 'role-findOne');
    try {
      const getRole = await super.getRoleById(req.params.id);
      if (!getRole.success) {
        return sendResponse.success(false, httpStatus.NO_CONTENT, httpStatus['204_MESSAGE'], getRole.message);
      }
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], getRole.data);
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
    const sendResponse = new Responser(res, 'role-create');
    try {
      const { email, _id: creator } = req.user;
      const getUser = await super.getUserByEmail(email);
      if (!getUser.success) {
        return sendResponse.success(false, httpStatus.OK, httpStatus['204_MESSAGE'], {
          message: 'user not found'
        });
      }

      const getNewRole = await super.updateRoleById(req.params.id, req.body, creator);
      if (!getNewRole.success) {
        return sendResponse.success(false, httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], {
          message: getNewRole.message
        });
      }
      return sendResponse.success(true, httpStatus.CREATED, httpStatus['201_MESSAGE'], getNewRole.data);
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
    const sendResponse = new Responser(res, 'role-delete');
    try {
      const removeRole = await super.removeRoleById(req.params.id);
      if (!removeRole.success) {
        return sendResponse.success(false, httpStatus.NO_CONTENT, httpStatus['204_MESSAGE'], removeRole.message);
      }
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], removeRole.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }
}

export default RoleController;