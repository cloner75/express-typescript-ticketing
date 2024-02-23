import { Request, Response, response } from 'express';
import Responser from './response';
import httpStatus from 'http-status';
import RoleModel from './../modules/user/schema/role.schema';
import PermissionModel from '../modules/user/schema/permission.schema';

class RoleBase {
  service: string;
  constructor(serviceName: string) {
    this.service = serviceName;
  }

  access(method: string) {
    return async (req: Request, res: Response, next: any) => {
      const responser = new Responser(res, this.service);
      try {
        if (!req.user) {
          return responser.success(false, httpStatus.FORBIDDEN, httpStatus['403_MESSAGE']);
        }

        const getRole = await RoleModel.findOne({ name: req.user.role });
        if (!getRole) {
          return responser.success(false, httpStatus.FORBIDDEN, httpStatus['403_MESSAGE']);
        }
        const getPermission = await PermissionModel.findOne({ roleId: getRole._id });
        if (!getPermission) {
          return responser.success(false, httpStatus.FORBIDDEN, httpStatus['403_MESSAGE']);
        }
        const selctServicePermission = getPermission.access.findIndex(item => item.service === this.service);
        if (selctServicePermission === -1) {
          return responser.success(false, httpStatus.FORBIDDEN, httpStatus['403_MESSAGE']);
        }
        if (!getPermission.access[selctServicePermission].methods.includes(method)) {
          return responser.success(false, httpStatus.FORBIDDEN, httpStatus['403_MESSAGE']);
        }
        next();
      } catch (err) {
        return responser.success(false, httpStatus.FORBIDDEN, httpStatus['403_MESSAGE'], {});
      }
    };
  }
}

export default RoleBase;