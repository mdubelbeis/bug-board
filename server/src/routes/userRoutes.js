import express from 'express';

// TODO: Implement auth routing

import {
  createUser,
  deleteUser,
  findUser,
  getAllUsers,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

// ROUTES CONFIG
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(findUser).patch(updateUser).delete(deleteUser);

export default router;
