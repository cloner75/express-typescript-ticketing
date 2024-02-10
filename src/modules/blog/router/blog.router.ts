import { Router } from 'express';
import Blog from './../controller/blog.controller';
const router = Router();

const BlogController = new Blog();
router.post('/', BlogController.create);
router.get('/', BlogController.find);
router.get('/:id', BlogController.findOne);
router.put('/:id', BlogController.update);
router.delete('/:id', BlogController.delete);

export default router;