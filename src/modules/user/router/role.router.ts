import { Router } from 'express';
import Role from '../controller/role.controller';
import Validator from '../../../helpers/validator';
import authorization from '../../../helpers/authorization';
import { role } from './../interface/validate.joi';
import RoleBase from '../../../helpers/role';
import *  as rolePermission from '../../../configs/permissions';
const { create, find, findOne, update, remove } = role;
const validate = new Validator('role_service');
const roleSelector = new RoleBase('role');

const router = Router();

const RoleController = new Role();
router.post('/',
  authorization.authorization,
  roleSelector.access(rolePermission.role.create),
  validate.validate(create, 'POST'),
  RoleController.create
);
router.get('/',
  authorization.authorization,
  roleSelector.access(rolePermission.role.find),
  validate.validate(find, 'GET'),
  RoleController.find
);
router.get('/:id',
  authorization.authorization,
  roleSelector.access(rolePermission.role.findOne),
  validate.validate(findOne, 'GET'),
  RoleController.findOne
);
router.put('/:id',
  authorization.authorization,
  roleSelector.access(rolePermission.role.update),
  validate.validate(update, 'PUT'),
  RoleController.update
);
router.delete('/:id',
  authorization.authorization,
  roleSelector.access(rolePermission.role.delete),
  validate.validate(remove, 'DELETE'),
  RoleController.delete
);

export default router;