import express from 'express';
import { login, getCurrentUser } from '../controllers/Auth.controller.js';
import { isAuthenticated } from '../middleware/Auth.middleware.js';

const router = express.Router();

router.post('/auth/login', login);
router.get('/auth/get-user', isAuthenticated, getCurrentUser);

export default router;
