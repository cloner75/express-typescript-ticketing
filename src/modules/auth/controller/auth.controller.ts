import { Request, Response, response } from 'express';
import * as cookie from 'cookie';
import UserService from './../../user/utils/user.service';
import Responser from '../../../helpers/response';
import httpStatus from 'http-status';
import jwt from './../../../helpers/jsonwebtoken';
import * as bcrypt from 'bcrypt';

class AuthService extends UserService {
  constructor() {
    super();
  }
  setTokens(res: Response, payload: any) {
    const access_token = String(jwt.sign(payload));
    const refresh_token = String(jwt.sign(payload, '30d'));

    res.setHeader('Set-Cookie',
      [cookie.serialize('access_token', access_token, {
        httpOnly: false,
        maxAge: 60 * 30 // 10 min
      }),
      cookie.serialize('refresh_token', refresh_token, {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 30 // 1 month
      })
      ]);
  }
}

class AuthController extends AuthService {
  constructor() {
    super();
  }
  /**
   * 
   * @param req 
   * @param res 
   * @returns 
   */
  async login(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'login');
    try {
      const { email: inputEmail, password } = req.body;
      const getUser = await super.getUserByEmail(inputEmail);
      if (!getUser.success) {
        return sendResponse.success(false, httpStatus.NO_CONTENT, httpStatus['204_MESSAGE']);
      }
      const checkPassword = await bcrypt.compare(password, getUser.data.password);
      if (!checkPassword) {
        return sendResponse.success(false, httpStatus.NO_CONTENT, httpStatus['204_MESSAGE']);
      }
      const { _id, username, email, createdAt, role } = getUser.data;
      super.setTokens(res, {
        _id,
        username,
        email,
        createdAt,
        role
      });
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], {
        _id,
        username,
        email,
        createdAt,
        role
      });
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
  async signup(req: Request, res: Response): Promise<any> {
    const responser = new Responser(res, 'signup');
    try {
      const { email, password, username } = req.body;
      const createUser = await super.signupUser(email, password, username);
      if (createUser.success) {
        const { _id, username, email, createdAt, role } = createUser.data;
        super.setTokens(res, {
          _id,
          username,
          email,
          createdAt,
          role
        });
        return responser.success(
          true,
          httpStatus.OK,
          httpStatus['200_MESSAGE'],
          {
            _id,
            username,
            email,
            createdAt,
            role
          }
        );
      } else if (!createUser.success) {
        return responser.success(
          false,
          httpStatus.CONFLICT,
          httpStatus['409_MESSAGE'],
          {
            message: createUser.message
          }
        );
      }
    } catch (err) {
      return responser.error(
        httpStatus.INTERNAL_SERVER_ERROR,
        httpStatus['500_MESSAGE'],
        err
      );
    }
  }


  /**
* 
* @param req 
* @param res 
* @returns 
*/
  async refreshToken(req: Request, res: Response): Promise<any> {
    const responser = new Responser(res, 'refreshToken');
    try {
      const { email: inputEmail } = req.body.user;
      const getUser = await super.getUserByEmail(inputEmail);
      if (!getUser.success) {
        return responser.success(
          false,
          httpStatus.NO_CONTENT,
          httpStatus['204_MESSAGE']
        );
      }

      const { _id, username, email, createdAt, role } = getUser.data;
      super.setTokens(res, {
        _id,
        username,
        email,
        createdAt,
        role
      });
      return responser.success(
        true,
        httpStatus.OK,
        httpStatus['200_MESSAGE'],
        {
          _id,
          username,
          email,
          createdAt,
          role
        }
      );
    } catch (err) {
      return responser.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }

  /**
* 
* @param req 
* @param res 
* @returns 
*/
  async logout(req: Request, res: Response): Promise<any> {
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

export default AuthController;