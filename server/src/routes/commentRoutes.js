import express from 'express';
import {
  createComment,
  deleteComment,
  findCommentById,
  getAllComments,
  updateComment,
} from '../controllers/commentController.js';

const router = express.Router();

router.route('/').get(getAllComments).post(createComment);
router
  .route('/:id')
  .get(findCommentById)
  .delete(deleteComment)
  .patch(updateComment);

export default router;
