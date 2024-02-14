import { Router } from 'express';
import Blog from './../controller/blog.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';
import authorization from './../../../helpers/authorization';


const validate = new Validator('blog_service');
const router = Router();

const BlogController = new Blog();
router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  BlogController.create
);
router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  BlogController.find
);
router.get('/:id',
  authorization.authorization,
  validate.validate(findOne, 'GET'),
  BlogController.findOne
);
router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  BlogController.update
);
router.delete('/:id',
  authorization.authorization,
  validate.validate(remove, 'DELETE'),
  BlogController.delete
);

export default router;