import express from 'express';
import {
	getUsers,
	getUserById,
	createUser,
	updateUserById,
	deleteUserById,
} from '../controllers/User.controller.js';

import { isAuthenticated } from '../middleware/Auth.middleware.js';

const router = express.Router();

router.get('/users', isAuthenticated, getUsers);
router.get('/users/:userId', isAuthenticated, getUserById);
router.post('/users', createUser);
router.put('/users/:userId', isAuthenticated, updateUserById);
router.delete('/users/:userId', isAuthenticated, deleteUserById);

export default router;
