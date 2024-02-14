import { Router } from 'express';
import Category from '../controller/category.controller';
import authorization from './../../../helpers/authorization';
import Validator from '../../../helpers/validator';
import { create, find, findOne, update, remove } from '../interface/validate.category.joi';

const validate = new Validator('product_category_service');
const router = Router();

const CategoryController = new Category();
router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  CategoryController.create
);
router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  CategoryController.find
);
router.get('/:id',
  authorization.authorization,
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
  validate.validate(remove, 'DELETE'),
  CategoryController.delete
);

export default router;