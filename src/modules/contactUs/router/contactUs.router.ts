import { Router } from 'express';
import ContactUs from './../controller/contactUs.controller';
const router = Router();

const ContactUsController = new ContactUs();
router.post('/', ContactUsController.create);
router.get('/', ContactUsController.find);
router.get('/:id', ContactUsController.findOne);
router.put('/:id', ContactUsController.update);
router.delete('/:id', ContactUsController.delete);

export default router;