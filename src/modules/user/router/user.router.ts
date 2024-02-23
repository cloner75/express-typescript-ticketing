import { Router } from 'express';
import User from '../controller/user.controller';
import Validator from './../../../helpers/validator';
import { user } from './../interface/validate.joi';
const { create, find, findOne, update, remove } = user;

import RoleBase from '../../../helpers/role';
import { user as userPermission } from '../../../configs/permissions';
import authorization from './../../../helpers/authorization';

const validate = new Validator('user_service');
const roleSelector = new RoleBase('user');

const router = Router();

const UserController = new User();
router.post('/',
  authorization.authorization,
  roleSelector.access(userPermission.create),
  validate.validate(create, 'POST'),
  UserController.create
);
router.get('/',
  authorization.authorization,
  roleSelector.access(userPermission.find),
  validate.validate(find, 'GET'),
  UserController.find
);
router.get('/:id',
  authorization.authorization,
  roleSelector.access(userPermission.findOne),
  validate.validate(findOne, 'GET'),
  UserController.findOne
);
router.put('/:id',
  authorization.authorization,
  roleSelector.access(userPermission.update),
  validate.validate(update, 'PUT'),
  UserController.update
);
router.delete('/:id',
  authorization.authorization,
  roleSelector.access(userPermission.delete),
  validate.validate(remove, 'DELETE'),
  UserController.delete
);

export default router;