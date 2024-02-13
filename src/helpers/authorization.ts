import { Request, Response, response } from 'express';
import cookie from 'cookie';
import jsonwebtoken from './jsonwebtoken';
import Responser from './response';
import httpStatus from 'http-status';

class Authorization {
  static authorization(req: Request, res: Response, next: any) {
    const responser = new Responser(res, 'authorization');
    try {
      const { access_token } = cookie.parse(req.headers.cookie || '');
      if (!access_token) {
        return responser.success(
          false,
          httpStatus.UNAUTHORIZED,
          httpStatus['401_MESSAGE']
        );
      }
      const verifyToken = jsonwebtoken.verify(access_token);
      console.log("🚀 ~ Authorization ~ authorization ~ verifyToken:", verifyToken);
      Object.assign(req.body, { user: verifyToken });
      next();
    } catch (err) {
      return responser.success(
        false,
        httpStatus.UNAUTHORIZED,
        httpStatus['401_MESSAGE']
      );

    }
  }

  static refreshToken(req: Request, res: Response, next: any) {
    const responser = new Responser(res, 'refreshToken');
    try {
      const { refresh_token } = cookie.parse(req.headers.cookie || '');
      if (!refresh_token) {
        return responser.success(
          false,
          httpStatus.UNAUTHORIZED,
          httpStatus['401_MESSAGE']
        );
      }
      const verifyToken = jsonwebtoken.verify(refresh_token);
      Object.assign(req.body, { user: verifyToken });
      next();
    } catch (err) {
      return responser.success(
        false,
        httpStatus.UNAUTHORIZED,
        httpStatus['401_MESSAGE']
      );

    }
  }
}


export default Authorization;