import { Request, Response, response } from 'express';
import Responser from './response';
import httpStatus from 'http-status';
class validator {
  service: string;
  constructor(serviceName: string) {
    this.service = serviceName;
  }

  validate(schema: any, method: string) {
    return async (req: Request, res: Response, next: any) => {
      const responser = new Responser(res, this.service);
      try {
        let data: any = {};
        switch (method) {
          case 'POST':
            data = req.body;
            break;
          case 'GET':
            data = { ...req.params, ...req.query };
            break;
          case 'DELETE':
          case 'PUT':
            data = { ...req.params, ...req.body };
            break;
        }
        await schema.validateAsync(data);
        next();
      } catch (err) {
        return responser.success(false, httpStatus.BAD_REQUEST, httpStatus['400_MESSAGE'], err);
      }
    };
  }
}

export default validator;