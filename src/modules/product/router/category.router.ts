import { Router } from 'express';
import Category from '../controller/category.controller';
import authorization from './../../../helpers/authorization';
import RoleBase from '../../../helpers/role';
import Validator from '../../../helpers/validator';
import { category } from './../../../configs/permissions';

import { create, find, findOne, update, remove, createSub } from '../interface/validate.category.joi';
const validate = new Validator('product_category_service');
const role = new RoleBase('category');
const router = Router();

const CategoryController = new Category();

router.get('/public',
  validate.validate(find, 'GET'),
  CategoryController.find
);

router.post('/',
  authorization.authorization,
  role.access(category.create),
  validate.validate(create, 'POST'),
  CategoryController.create
);

router.post('/sub',
  authorization.authorization,
  role.access(category.createSub),
  validate.validate(createSub, 'POST'),
  CategoryController.createSub
);

router.get('/',
  authorization.authorization,
  role.access(category.find),
  validate.validate(find, 'GET'),
  CategoryController.find
);
router.get('/:id',
  authorization.authorization,
  role.access(category.findOne),
  validate.validate(findOne, 'GET'),
  CategoryController.findOne
);
router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  CategoryController.update
);
router.delete('/:id',
  authorization.authorization,
  role.access(category.delete),
  validate.validate(remove, 'DELETE'),
  CategoryController.delete
);

export default router;