import { Router } from 'express';
import Product from '../controller/product.controller';
import authorization from './../../../helpers/authorization';
import Validator from './../../../helpers/validator';
import RoleBase from '../../../helpers/role';
import { product } from './../../../configs/permissions';

import { create, find, findOne, update, remove } from './../interface/validate.product.joi';

const validate = new Validator('product_service');
const role = new RoleBase('product');

const router = Router();

const ProductController = new Product();
router.post('/',
  authorization.authorization,
  validate.validate(create, product.create),
  ProductController.create
);
router.get('/',
  authorization.authorization,
  validate.validate(create, product.find),
  validate.validate(find, 'GET'),
  ProductController.find
);
router.get('/:id',
  authorization.authorization,
  validate.validate(create, product.findOne),
  validate.validate(findOne, 'GET'),
  ProductController.findOne
);
router.put('/:id',
  authorization.authorization,
  validate.validate(create, product.update),
  validate.validate(update, 'PUT'),
  ProductController.update
);
router.delete('/:id',
  authorization.authorization,
  validate.validate(create, product.delete),
  validate.validate(remove, 'DELETE'),
  ProductController.delete
);

export default router;