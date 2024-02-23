import { Router } from 'express';
import Customer from '../controller/customer.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';
import authorization from './../../../helpers/authorization';
import RoleBase from '../../../helpers/role';
import { customer } from '../../../configs/permissions';

const validate = new Validator('customer_service');
const role = new RoleBase('customer');
const router = Router();

const CustomerController = new Customer();
router.post('/',
  authorization.authorization,
  role.access(customer.create),
  validate.validate(create, 'POST'),
  CustomerController.create
);
router.get('/',
  authorization.authorization,
  role.access(customer.find),
  validate.validate(find, 'GET'),
  CustomerController.find
);
router.get('/:id',
  authorization.authorization,
  role.access(customer.findOne),
  validate.validate(findOne, 'GET'),
  CustomerController.findOne
);
router.put('/:id',
  authorization.authorization,
  role.access(customer.update),
  validate.validate(update, 'PUT'),
  CustomerController.update
);
router.delete('/:id',
  authorization.authorization,
  role.access(customer.delete),
  validate.validate(remove, 'DELETE'),
  CustomerController.delete
);

export default router;