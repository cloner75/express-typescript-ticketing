import { Router } from 'express';
import Comment from './../controller/comment.controller';
import Validator from './../../../helpers/validator';
import { create, find, findOne, update, remove } from './../interface/validate.joi';

const validate = new Validator('comment_service');
const router = Router();

const CommentController = new Comment();
router.post('/', validate.validate(create, 'POST'), CommentController.create);
router.get('/', validate.validate(find, 'GET'), CommentController.find);
router.get('/:id', validate.validate(findOne, 'GET'), CommentController.findOne);
router.put('/:id', validate.validate(update, 'PUT'), CommentController.update);
router.delete('/:id', validate.validate(remove, 'DELETE'), CommentController.delete);

export default router;