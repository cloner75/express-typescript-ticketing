import { Router } from 'express';
import Brand from '../controller/brand.controller';
import authorization from './../../../helpers/authorization';
import Validator from '../../../helpers/validator';
import RoleBase from '../../../helpers/role';
import { brand } from './../../../configs/permissions';
import { create, find, findOne, update, remove } from '../interface/validate.brand.joi';

const validate = new Validator('product_brand_service');
const role = new RoleBase('brand');
const router = Router();

const BrandController = new Brand();
router.post('/',
  authorization.authorization,
  role.access(brand.create),
  validate.validate(create, 'POST'),
  BrandController.create
);
router.get('/',
  authorization.authorization,
  role.access(brand.find),
  validate.validate(find, 'GET'),
  BrandController.find
);
router.get('/:id',
  authorization.authorization,
  role.access(brand.findOne),
  validate.validate(findOne, 'GET'),
  BrandController.findOne
);
router.put('/:id',
  authorization.authorization,
  role.access(brand.update),
  validate.validate(update, 'PUT'),
  BrandController.update
);
router.delete('/:id',
  authorization.authorization,
  role.access(brand.delete),
  validate.validate(remove, 'DELETE'),
  BrandController.delete
);

export default router;