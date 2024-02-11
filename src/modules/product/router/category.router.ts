import { Router } from 'express';
import Category from '../controller/category.controller';

import Validator from '../../../helpers/validator';
import { create, find, findOne, update, remove } from '../interface/validate.category.joi';

const validate = new Validator('product_category_service');
const router = Router();

const CategoryController = new Category();
router.post('/', validate.validate(create, 'POST'), CategoryController.create);
router.get('/', validate.validate(find, 'GET'), CategoryController.find);
router.get('/:id', validate.validate(findOne, 'GET'), CategoryController.findOne);
router.put('/:id', validate.validate(update, 'PUT'), CategoryController.update);
router.delete('/:id', validate.validate(remove, 'DELETE'), CategoryController.delete);

export default router;