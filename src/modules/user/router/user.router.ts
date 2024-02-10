import { Router } from 'express';
import User from '../controller/user.controller';
const router = Router();

const UserController = new User();
router.post('/', UserController.create);
router.get('/', UserController.find);
router.get('/:id', UserController.findOne);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;