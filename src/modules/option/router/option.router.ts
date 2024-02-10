import { Router } from 'express';
import Option from '../controller/option.controller';
const router = Router();

const OptionController = new Option();
router.post('/', OptionController.create);
router.get('/', OptionController.find);
router.get('/:id', OptionController.findOne);
router.put('/:id', OptionController.update);
router.delete('/:id', OptionController.delete);

export default router;