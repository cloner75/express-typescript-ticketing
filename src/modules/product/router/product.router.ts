import { Router } from 'express';
import Product from '../controller/product.controller';

import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.product.joi';

const validate = new Validator('product_service');
const router = Router();

const ProductController = new Product();
router.post('/', validate.validate(create, 'POST'), ProductController.create);
router.get('/', validate.validate(find, 'GET'), ProductController.find);
router.get('/:id', validate.validate(findOne, 'GET'), ProductController.findOne);
router.put('/:id', validate.validate(update, 'PUT'), ProductController.update);
router.delete('/:id', validate.validate(remove, 'DELETE'), ProductController.delete);

export default router;