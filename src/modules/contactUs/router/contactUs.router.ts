import { Router } from 'express';
import ContactUs from './../controller/contactUs.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';
import authorization from './../../../helpers/authorization';


const validate = new Validator('contact_us_service');
const router = Router();

const ContactUsController = new ContactUs();
router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  ContactUsController.create
);
router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  ContactUsController.find
);
router.get('/:id',
  authorization.authorization,
  validate.validate(findOne, 'GET'),
  ContactUsController.findOne
);
router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  ContactUsController.update
);
router.delete('/:id',
  authorization.authorization,
  validate.validate(remove, 'DELETE'),
  ContactUsController.delete
);

export default router;