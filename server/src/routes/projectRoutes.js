import express from 'express';
import {
  createProject,
  deleteProject,
  findProject,
  getAllProjects,
  updateProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.route('/').get(getAllProjects).post(createProject);
router
  .route('/:id')
  .get(findProject)
  .delete(deleteProject)
  .patch(updateProject);

export default router;
