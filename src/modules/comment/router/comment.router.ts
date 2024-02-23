import { Router } from 'express';
import Comment from './../controller/comment.controller';
import Validator from './../../../helpers/validator';
import RoleBase from '../../../helpers/role';
import { comment } from '../../../configs/permissions';

import { create, find, findOne, update, remove } from './../interface/validate.joi';

import authorization from './../../../helpers/authorization';

const validate = new Validator('comment_service');
const role = new RoleBase('comment');
const router = Router();

const CommentController = new Comment();
router.post('/',
  authorization.authorization,
  role.access(comment.create),
  validate.validate(create, 'POST'),
  CommentController.create
);
router.get('/',
  authorization.authorization,
  role.access(comment.find),
  validate.validate(find, 'GET'),
  CommentController.find
);
router.get('/:id',
  authorization.authorization,
  role.access(comment.findOne),
  validate.validate(findOne, 'GET'),
  CommentController.findOne
);
router.put('/:id',
  authorization.authorization,
  role.access(comment.update),
  validate.validate(update, 'PUT'),
  CommentController.update
);
router.delete('/:id',
  authorization.authorization,
  role.access(comment.delete),
  validate.validate(remove, 'DELETE'),
  CommentController.delete
);

export default router;