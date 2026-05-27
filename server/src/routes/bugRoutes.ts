import express, { Router } from 'express';
import {
  createBug,
  deleteBug,
  findBug,
  getAllBugs,
  updateBug,
} from '../controllers/bugController.js';

const router: Router = express.Router();

router.route('/').get(getAllBugs).post(createBug);
router.route('/:id').get(findBug).patch(updateBug).delete(deleteBug);

export default router;
