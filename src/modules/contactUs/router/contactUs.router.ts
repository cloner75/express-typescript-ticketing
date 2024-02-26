import { Router } from 'express';
import ContactUs from './../controller/contactUs.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';
import authorization from './../../../helpers/authorization';
import RoleBase from '../../../helpers/role';
import { contactUs } from '../../../configs/permissions';

const validate = new Validator('contact_us_service');
const role = new RoleBase('contactUs');
const router = Router();

const ContactUsController = new ContactUs();
router.post('/',
  authorization.authorization,
  role.access(contactUs.create),
  validate.validate(create, 'POST'),
  ContactUsController.create
);
router.get('/',
  authorization.authorization,
  role.access(contactUs.find),
  validate.validate(find, 'GET'),
  ContactUsController.find
);
router.get('/:id',
  authorization.authorization,
  role.access(contactUs.findOne),
  validate.validate(findOne, 'GET'),
  ContactUsController.findOne
);
router.put('/:id',
authorization.authorization,
  role.access(contactUs.update),
  validate.validate(update, 'PUT'),
  ContactUsController.update
);

router.delete('/:id',
authorization.authorization,
  role.access(contactUs.delete),
  validate.validate(remove, 'DELETE'),
  ContactUsController.delete
);

export default router;