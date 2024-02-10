import { Request, Response } from 'express';
import UserService from '../../user/utils/user.service';
import Responser from '../../../helpers/response';
import httpStatus from 'http-status';

class WalletController extends UserService {
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
    const sendResponse = new Responser(res, 'login');
    try {
      const { email } = req.body;
      const getUser = await super.getUserByEmail(email);
      if (!getUser.success) {
        return sendResponse.success(false, httpStatus.OK, httpStatus['204_MESSAGE']);
      }
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], getUser.data);
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
    try {
      const { email, password } = req.body;
      return res.send({
        success: false
      });
    } catch (err) {
      return res.send({
        err: 'err.message'
      });
    }
  }


  /**
* 
* @param req 
* @param res 
* @returns 
*/
  async findOne(req: Request, res: Response): Promise<any> {
    try {
      return res.send({
        success: false
      });
    } catch (err) {
      return res.send({
        err: 'err.message'
      });
    }
  }

  /**
* 
* @param req 
* @param res 
* @returns 
*/
  async update(req: Request, res: Response): Promise<any> {
    try {
      return res.send({
        success: false
      });
    } catch (err) {
      return res.send({
        err: 'err.message'
      });
    }
  }


  /**
* 
* @param req 
* @param res 
* @returns 
*/
  async delete(req: Request, res: Response): Promise<any> {
    try {
      return res.send({
        success: false
      });
    } catch (err) {
      return res.send({
        err: 'err.message'
      });
    }
  }
}

export default WalletController;