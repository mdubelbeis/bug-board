import express, { Router } from 'express';
import { protect } from '../controllers/authController.js';
import {
  createProject,
  deleteProject,
  findProject,
  getAllProjects,
  updateProject,
} from '../controllers/projectController.js';

const router: Router = express.Router();

router.route('/').get(protect, getAllProjects).post(createProject);
router
  .route('/:id')
  .get(findProject)
  .delete(deleteProject)
  .patch(updateProject);

export default router;
