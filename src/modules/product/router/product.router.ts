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

// public routes
router.get(
  '/public',
  validate.validate(find, 'GET'),
  ProductController.find
);

router.post('/',
  authorization.authorization,
  role.access(product.create),
  validate.validate(create, 'POST'),
  ProductController.create
);
router.get('/',
  authorization.authorization,
  role.access(product.find),
  validate.validate(find, 'GET'),
  ProductController.find
);
router.get('/:id',
  authorization.authorization,
  role.access(product.findOne),
  validate.validate(findOne, 'GET'),
  ProductController.findOne
);
router.put('/:id',
  authorization.authorization,
  role.access(product.update),
  validate.validate(update, 'PUT'),
  ProductController.update
);
router.delete('/:id',
  authorization.authorization,
  role.access(product.delete),
  validate.validate(remove, 'DELETE'),
  ProductController.delete
);

export default router;