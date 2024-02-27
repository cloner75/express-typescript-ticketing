import { Router } from 'express';
import Option from '../controller/option.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';
import authorization from './../../../helpers/authorization';
import RoleBase from '../../../helpers/role';
import { option } from '../../../configs/permissions';

const validate = new Validator('option_service');
const role = new RoleBase('option');
const router = Router();

const OptionController = new Option();

router.get('/public',
  validate.validate(find, 'GET'),
  OptionController.find
);

router.post('/',
  authorization.authorization,
  role.access(option.create),
  validate.validate(create, 'POST'),
  OptionController.create
);

router.get('/',
  authorization.authorization,
  role.access(option.find),
  validate.validate(find, 'GET'),
  OptionController.find
);

router.get('/:id',
  authorization.authorization,
  role.access(option.findOne),
  validate.validate(findOne, 'GET'),
  OptionController.findOne
);

router.put('/:id',
  authorization.authorization,
  role.access(option.update),
  validate.validate(update, 'PUT'),
  OptionController.update
);

router.delete('/:id',
  authorization.authorization,
  role.access(option.delete),
  validate.validate(remove, 'DELETE'),
  OptionController.delete
);

export default router;