import express, { Router } from 'express';
import {
  getAuthUser,
  login,
  signup,
  updateAuthUser,
  updateUserPassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router: Router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/me').get(protect, getAuthUser).patch(protect, updateAuthUser);
router.route('/update-password').patch(protect, updateUserPassword);

export default router;
