import { Router } from 'express';
import Blog from './../controller/blog.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';

const validate = new Validator('blog_service');
const router = Router();

const BlogController = new Blog();
router.post('/', validate.validate(create, 'create'), BlogController.create);
router.get('/', validate.validate(find, 'find'), BlogController.find);
router.get('/:id', validate.validate(findOne, 'findOne'), BlogController.findOne);
router.put('/:id', validate.validate(update, 'update'), BlogController.update);
router.delete('/:id', validate.validate(remove, 'remove'), BlogController.delete);

export default router;