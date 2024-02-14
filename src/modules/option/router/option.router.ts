import { Router } from 'express';
import Option from '../controller/option.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';
import authorization from './../../../helpers/authorization';

const validate = new Validator('option_service');
const router = Router();

const OptionController = new Option();
router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  OptionController.create
);

router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  OptionController.find
);

router.get('/:id',
  authorization.authorization,
  validate.validate(findOne, 'GET'),
  OptionController.findOne
);

router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  OptionController.update
);

router.delete('/:id',
  authorization.authorization,
  validate.validate(remove, 'DELETE'),
  OptionController.delete
);

export default router;