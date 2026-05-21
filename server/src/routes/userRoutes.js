import express from 'express';
import { getAllUsers } from '../controllers/userController.js';

// Import controller functions from controllers/userController.js

const router = express.Router();

// ROUTES CONFIG
router.route('/').get(getAllUsers);
router.route('/:id');

export default router;
