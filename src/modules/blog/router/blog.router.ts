import { Router } from 'express';
import Blog from './../controller/blog.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove ,findBySlug} from './../interface/validate.joi';
import RoleBase from '../../../helpers/role';
import { blog } from '../../../configs/permissions';
import authorization from './../../../helpers/authorization';


const validate = new Validator('blog_service');
const role = new RoleBase('blog');
const router = Router();

const BlogController = new Blog();

router.get('/public/:slug',
  validate.validate(findBySlug, 'GET'),
  BlogController.publicFindBySlug
);

router.post('/',
  authorization.authorization,
  role.access(blog.create),
  validate.validate(create, 'POST'),
  BlogController.create
);
router.get('/',
  authorization.authorization,
  role.access(blog.find),
  validate.validate(find, 'GET'),
  BlogController.find
);
router.get('/:id',
  authorization.authorization,
  role.access(blog.findOne),
  validate.validate(findOne, 'GET'),
  BlogController.findOne
);
router.put('/:id',
  authorization.authorization,
  role.access(blog.update),
  validate.validate(update, 'PUT'),
  BlogController.update
);
router.delete('/:id',
  authorization.authorization,
  role.access(blog.delete),
  validate.validate(remove, 'DELETE'),
  BlogController.delete
);

export default router;