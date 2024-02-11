import { Router } from 'express';
import ContactUs from './../controller/contactUs.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';

const validate = new Validator('contact_us_service');
const router = Router();

const ContactUsController = new ContactUs();
router.post('/', validate.validate(create, 'POST'), ContactUsController.create);
router.get('/', validate.validate(find, 'GET'), ContactUsController.find);
router.get('/:id', validate.validate(findOne, 'GET'), ContactUsController.findOne);
router.put('/:id', validate.validate(update, 'PUT'), ContactUsController.update);
router.delete('/:id', validate.validate(remove, 'DELETE'), ContactUsController.delete);

export default router;