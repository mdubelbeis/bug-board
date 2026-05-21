import express from 'express';

// Import controller functions from controllers/userController.js

const router = express.Router();

// ROUTES CONFIG
router.route('/');
router.route('/:id');

export default router;
