import express from 'express';
import {
	getUsers,
	getUserById,
	createUser,
	updateUserById,
	deleteUserById,
} from '../controllers/User.controller.js';

import { isAuthenticated } from '../middleware/Auth.middleware.js';
import { isAdmin } from '../middleware/Admin.middleware.js';

const router = express.Router();

router.get('/users', isAuthenticated, getUsers);
router.get('/users/:userId', isAuthenticated, getUserById);
router.post('/users', isAuthenticated, isAdmin, createUser);
router.put('/users/:userId', isAuthenticated, isAdmin, updateUserById);
router.delete('/users/:userId', isAuthenticated, isAdmin, deleteUserById);

export default router;
