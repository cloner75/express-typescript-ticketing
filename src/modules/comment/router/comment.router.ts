import { Router } from 'express';
import Comment from './../controller/comment.controller';
const router = Router();

const CommentController = new Comment();
router.post('/', CommentController.create);
router.get('/', CommentController.find);
router.get('/:id', CommentController.findOne);
router.put('/:id', CommentController.update);
router.delete('/:id', CommentController.delete);

export default router;