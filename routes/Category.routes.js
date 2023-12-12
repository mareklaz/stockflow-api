import express from 'express';
import {
	getCategories,
	getCategoryById,
	createCategory,
	updateCategoryById,
	deleteCategoryById,
} from '../controllers/Category.controller.js';

import { isAuthenticated } from '../middleware/Auth.middleware.js';
import { isAdmin } from '../middleware/Admin.middleware.js';

const router = express.Router();

router.get('/categories', isAuthenticated, getCategories);
router.get('/categories/:categoryId', isAuthenticated, getCategoryById);
router.post('/categories', isAuthenticated, isAdmin, createCategory);
router.put('/categories/:categoryId', isAuthenticated, isAdmin, updateCategoryById);
router.delete('/categories/:categoryId', isAuthenticated, isAdmin, deleteCategoryById);

export default router;
