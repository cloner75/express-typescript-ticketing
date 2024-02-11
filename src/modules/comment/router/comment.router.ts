import { Router } from 'express';
import Comment from './../controller/comment.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';

const validate = new Validator('comment_service');
const router = Router();

const CommentController = new Comment();
router.post('/', validate.validate(create, 'create'), CommentController.create);
router.get('/', validate.validate(find, 'find'), CommentController.find);
router.get('/:id', validate.validate(findOne, 'findOne'), CommentController.findOne);
router.put('/:id', validate.validate(update, 'update'), CommentController.update);
router.delete('/:id', validate.validate(remove, 'remove'), CommentController.delete);

export default router;