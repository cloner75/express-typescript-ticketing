import { Router } from 'express';
import Option from '../controller/option.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';

const validate = new Validator('option_service');
const router = Router();

const OptionController = new Option();
router.post('/', validate.validate(create, 'create'), OptionController.create);
router.get('/', validate.validate(find, 'find'), OptionController.find);
router.get('/:id', validate.validate(findOne, 'findOne'), OptionController.findOne);
router.put('/:id', validate.validate(update, 'update'), OptionController.update);
router.delete('/:id', validate.validate(remove, 'remove'), OptionController.delete);

export default router;