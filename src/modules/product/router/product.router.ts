import { Router } from 'express';
import Product from '../controller/product.controller';
import authorization from './../../../helpers/authorization';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.product.joi';

const validate = new Validator('product_service');
const router = Router();

const ProductController = new Product();
router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  ProductController.create
);
router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  ProductController.find
);
router.get('/:id',
  authorization.authorization,
  validate.validate(findOne, 'GET'),
  ProductController.findOne
);
router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  ProductController.update
);
router.delete('/:id',
  authorization.authorization,
  validate.validate(remove, 'DELETE'),
  ProductController.delete
);

export default router;