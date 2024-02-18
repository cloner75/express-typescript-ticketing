import { Router } from 'express';
import Role from '../controller/role.controller';
import Validator from '../../../helpers/validator';
import authorization from '../../../helpers/authorization';
import { role } from './../interface/validate.joi';
const { create, find, findOne, update, remove } = role;

const validate = new Validator('role_service');

const router = Router();

const RoleController = new Role();
router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  RoleController.create
);
router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  RoleController.find
);
router.get('/:id',
  authorization.authorization,
  validate.validate(findOne, 'GET'),
  RoleController.findOne
);
router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  RoleController.update
);
router.delete('/:id',
  authorization.authorization,
  validate.validate(remove, 'DELETE'),
  RoleController.delete
);

export default router;