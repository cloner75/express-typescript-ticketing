import { Router } from 'express';
import User from '../controller/user.controller';
import Validator from './../../../helpers/validator';
import { user } from './../interface/validate.joi';
const { create, find, findOne, update, remove } = user;

import authorization from './../../../helpers/authorization';

const validate = new Validator('user_service');

const router = Router();

const UserController = new User();
router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  UserController.create
);
router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  UserController.find
);
router.get('/:id',
  authorization.authorization,
  validate.validate(findOne, 'GET'),
  UserController.findOne
);
router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  UserController.update
);
router.delete('/:id',
  authorization.authorization,
  validate.validate(remove, 'DELETE'),
  UserController.delete
);

export default router;