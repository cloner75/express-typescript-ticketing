import { Router } from 'express';
import Permission from '../controller/permission.controller';
import Validator from '../../../helpers/validator';
import authorization from '../../../helpers/authorization';
import RoleBase from '../../../helpers/role';
import * as  permissionRole  from '../../../configs/permissions';

import { permission } from './../interface/validate.joi';
const { create, find, findOne, update, remove } = permission;

const validate = new Validator('permission_service');
const role = new RoleBase('permission');

const router = Router();

const PermissionController = new Permission();
router.post('/',
  authorization.authorization,
  role.access(permissionRole.permission.create),
  validate.validate(create, 'POST'),
  PermissionController.create
);
router.get('/',
  authorization.authorization,
  role.access(permissionRole.permission.find),
  validate.validate(find, 'GET'),
  PermissionController.find
);
router.get('/:id',
  authorization.authorization,
  role.access(permissionRole.permission.findOne),
  validate.validate(findOne, 'GET'),
  PermissionController.findOne
);
router.put('/:id',
  authorization.authorization,
  role.access(permissionRole.permission.update),
  validate.validate(update, 'PUT'),
  PermissionController.update
);
router.delete('/:id',
  authorization.authorization,
  role.access(permissionRole.permission.delete),
  validate.validate(remove, 'DELETE'),
  PermissionController.delete
);

export default router;