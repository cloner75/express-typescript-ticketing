import { Router } from 'express';
import Comment from './../controller/comment.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';

import authorization from './../../../helpers/authorization';

const validate = new Validator('comment_service');
const router = Router();

const CommentController = new Comment();
router.post('/',
  authorization.authorization,
  validate.validate(create, 'POST'),
  CommentController.create
);
router.get('/',
  authorization.authorization,
  validate.validate(find, 'GET'),
  CommentController.find
);
router.get('/:id',
  authorization.authorization,
  validate.validate(findOne, 'GET'),
  CommentController.findOne
);
router.put('/:id',
  authorization.authorization,
  validate.validate(update, 'PUT'),
  CommentController.update
);
router.delete('/:id',
  authorization.authorization,
  validate.validate(remove, 'DELETE'),
  CommentController.delete
);

export default router;