import express, { Router } from 'express';
import {
  createProject,
  deleteProject,
  findProject,
  getAllProjects,
  updateProject,
} from '../controllers/projectController.js';
import { getProjectBugs } from '../controllers/bugController.js';

const router: Router = express.Router();

router.route('/').get(getAllProjects).post(createProject);
router
  .route('/:id')
  .get(findProject)
  .delete(deleteProject)
  .patch(updateProject);
router.route('/:projectId/bugs').get(getProjectBugs);
export default router;
