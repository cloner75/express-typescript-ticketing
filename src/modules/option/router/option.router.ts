import { Router } from 'express';
import Option from '../controller/option.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';

const validate = new Validator('option_service');
const router = Router();

const OptionController = new Option();
router.post('/', validate.validate(create, 'POST'), OptionController.create);
router.get('/', validate.validate(find, 'GET'), OptionController.find);
router.get('/:id', validate.validate(findOne, 'GET'), OptionController.findOne);
router.put('/:id', validate.validate(update, 'PUT'), OptionController.update);
router.delete('/:id', validate.validate(remove, 'DELETE'), OptionController.delete);

export default router;