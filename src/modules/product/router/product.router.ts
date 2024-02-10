import { Router } from 'express';
import Product from '../controller/product.controller';
const router = Router();

const ProductController = new Product();
router.post('/', ProductController.create);
router.get('/', ProductController.find);
router.get('/:id', ProductController.findOne);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;