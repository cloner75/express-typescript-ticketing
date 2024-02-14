import { Router } from 'express';
import Customer from '../controller/customer.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';
import authorization from './../../../helpers/authorization';

const validate = new Validator('customer_service');
const router = Router();

const CustomerController = new Customer();
router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  CustomerController.create
);
router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  CustomerController.find
);
router.get('/:id',
  authorization.authorization,
  validate.validate(findOne, 'GET'),
  CustomerController.findOne
);
router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  CustomerController.update
);
router.delete('/:id',
  authorization.authorization,
  validate.validate(remove, 'DELETE'),
  CustomerController.delete
);

export default router;