import { Router } from 'express';
import Brand from '../controller/brand.controller';

import Validator from '../../../helpers/validator';
import { create, find, findOne, update, remove } from '../interface/validate.brand.joi';

const validate = new Validator('product_brand_service');
const router = Router();

const BrandController = new Brand();
router.post('/', validate.validate(create, 'POST'), BrandController.create);
router.get('/', validate.validate(find, 'GET'), BrandController.find);
router.get('/:id', validate.validate(findOne, 'GET'), BrandController.findOne);
router.put('/:id', validate.validate(update, 'PUT'), BrandController.update);
router.delete('/:id', validate.validate(remove, 'DELETE'), BrandController.delete);

export default router;