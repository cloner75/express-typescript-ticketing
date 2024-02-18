import { Router } from 'express';
import Permission from '../controller/permission.controller';
import Validator from '../../../helpers/validator';
import authorization from '../../../helpers/authorization';

import { permission } from './../interface/validate.joi';
const { create, find, findOne, update, remove } = permission;

const validate = new Validator('permission_service');

const router = Router();

const PermissionController = new Permission();
router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  PermissionController.create
);
router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  PermissionController.find
);
router.get('/:id',
  authorization.authorization,
  validate.validate(findOne, 'GET'),
  PermissionController.findOne
);
router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  PermissionController.update
);
router.delete('/:id',
  authorization.authorization,
  validate.validate(remove, 'DELETE'),
  PermissionController.delete
);

export default router;