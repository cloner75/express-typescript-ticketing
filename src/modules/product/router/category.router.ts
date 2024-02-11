import { Router } from 'express';
import Category from '../controller/category.controller';

import Validator from '../../../helpers/validator';
import { create, find, findOne, update, remove } from '../interface/validate.category.joi';

const validate = new Validator('product_category_service');
const router = Router();

const CategoryController = new Category();
router.post('/', validate.validate(create, 'create'), CategoryController.create);
router.get('/', validate.validate(find, 'find'), CategoryController.find);
router.get('/:id', validate.validate(findOne, 'findOne'), CategoryController.findOne);
router.put('/:id', validate.validate(update, 'update'), CategoryController.update);
router.delete('/:id', validate.validate(remove, 'remove'), CategoryController.delete);

export default router;