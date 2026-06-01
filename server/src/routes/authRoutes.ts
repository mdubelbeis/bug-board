import express, { Router } from 'express';
import { signup } from '../controllers/authController.js';

const router: Router = express.Router();

router.route('/signup').post(signup);

export default router;
