import { Router } from 'express';
import Customer from '../controller/customer.controller';
const router = Router();

const CustomerController = new Customer();
router.post('/', CustomerController.create);
router.get('/', CustomerController.find);
router.get('/:id', CustomerController.findOne);
router.put('/:id', CustomerController.update);
router.delete('/:id', CustomerController.delete);

export default router;