import { Router } from 'express';
import Brand from '../controller/brand.controller';
import authorization from './../../../helpers/authorization';
import Validator from '../../../helpers/validator';
import { create, find, findOne, update, remove } from '../interface/validate.brand.joi';

const validate = new Validator('product_brand_service');
const router = Router();

const BrandController = new Brand();
router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  BrandController.create
);
router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  BrandController.find
);
router.get('/:id',
  authorization.authorization,
  validate.validate(findOne, 'GET'),
  BrandController.findOne
);
router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  BrandController.update
);
router.delete('/:id',
  authorization.authorization,
  validate.validate(remove, 'DELETE'),
  BrandController.delete
);

export default router;