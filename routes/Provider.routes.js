import express from 'express';
import {
	getProviders,
	getProviderById,
	createProvider,
	updateProviderById,
	deleteProviderById,
} from '../controllers/Provider.controller.js';

import { isAuthenticated } from '../middleware/Auth.middleware.js';
import { isAdmin } from '../middleware/Admin.middleware.js';

const router = express.Router();

router.get('/providers', isAuthenticated, isAdmin, getProviders);
router.get('/providers/:providerId', isAuthenticated, isAdmin, getProviderById);
router.post('/providers', isAuthenticated, isAdmin, createProvider);
router.put('/providers/:providerId', isAuthenticated, isAdmin, updateProviderById);
router.delete('/providers/:providerId', isAuthenticated, isAdmin, deleteProviderById);

export default router;
