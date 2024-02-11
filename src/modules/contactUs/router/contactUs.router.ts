import { Router } from 'express';
import ContactUs from './../controller/contactUs.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';

const validate = new Validator('contact_us_service');
const router = Router();

const ContactUsController = new ContactUs();
router.post('/', validate.validate(create, 'create'), ContactUsController.create);
router.get('/', validate.validate(find, 'find'), ContactUsController.find);
router.get('/:id', validate.validate(findOne, 'findOne'), ContactUsController.findOne);
router.put('/:id', validate.validate(update, 'update'), ContactUsController.update);
router.delete('/:id', validate.validate(remove, 'remove'), ContactUsController.delete);

export default router;