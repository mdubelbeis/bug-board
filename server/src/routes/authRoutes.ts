import express, { Router } from 'express';
import {
  getAuthUser,
  login,
  protect,
  signup,
  updateAuthUser,
  updateUserPassword,
} from '../controllers/authController.js';

const router: Router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/me').get(getAuthUser).patch(updateAuthUser);
router.route('/update-password').patch(protect, updateUserPassword);

export default router;
