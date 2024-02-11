import { Router } from 'express';
import Customer from '../controller/customer.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';

const validate = new Validator('customer_service');
const router = Router();

const CustomerController = new Customer();
router.post('/', validate.validate(create, 'POST'), CustomerController.create);
router.get('/', validate.validate(find, 'GET'), CustomerController.find);
router.get('/:id', validate.validate(findOne, 'GET'), CustomerController.findOne);
router.put('/:id', validate.validate(update, 'PUT'), CustomerController.update);
router.delete('/:id', validate.validate(remove, 'DELETE'), CustomerController.delete);

export default router;