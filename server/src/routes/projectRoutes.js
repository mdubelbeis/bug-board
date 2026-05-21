import express from 'express';
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.route('/').get(getAllProjects).post(createProject);
router
  .route('/:id')
  .get(getProjectById)
  .delete(deleteProject)
  .patch(updateProject);

export default router;
