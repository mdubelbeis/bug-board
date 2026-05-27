import express, { Router } from 'express';
import {
  createComment,
  deleteComment,
  findComment,
  getAllComments,
  updateComment,
} from '../controllers/commentController.js';

const router: Router = express.Router();

router.route('/').get(getAllComments).post(createComment);
router
  .route('/:id')
  .get(findComment)
  .delete(deleteComment)
  .patch(updateComment);

export default router;
