import { Router } from 'express';
import Product from '../controller/product.controller';

import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.product.joi';

const validate = new Validator('product_service');
const router = Router();

const ProductController = new Product();
router.post('/', validate.validate(create, 'create'), ProductController.create);
router.get('/', validate.validate(find, 'find'), ProductController.find);
router.get('/:id', validate.validate(findOne, 'findOne'), ProductController.findOne);
router.put('/:id', validate.validate(update, 'update'), ProductController.update);
router.delete('/:id', validate.validate(remove, 'remove'), ProductController.delete);

export default router;