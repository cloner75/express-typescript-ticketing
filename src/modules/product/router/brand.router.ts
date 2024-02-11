import { Router } from 'express';
import Brand from '../controller/brand.controller';

import Validator from '../../../helpers/validator';
import { create, find, findOne, update, remove } from '../interface/validate.brand.joi';

const validate = new Validator('product_brand_service');
const router = Router();

const BrandController = new Brand();
router.post('/', validate.validate(create, 'create'), BrandController.create);
router.get('/', validate.validate(find, 'find'), BrandController.find);
router.get('/:id', validate.validate(findOne, 'findOne'), BrandController.findOne);
router.put('/:id', validate.validate(update, 'update'), BrandController.update);
router.delete('/:id', validate.validate(remove, 'remove'), BrandController.delete);

export default router;