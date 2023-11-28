import express from 'express';
import {
	getProviders,
	getProviderById,
	createProvider,
	updateProviderById,
	deleteProviderById,
} from '../controllers/Provider.controller.js';

import { isAuthenticated } from '../middleware/Auth.middleware.js';

const router = express.Router();

router.get('/providers', isAuthenticated, getProviders);
router.get('/providers/:providerId', isAuthenticated, getProviderById);
router.post('/providers', isAuthenticated, createProvider);
router.put('/providers/:providerId', isAuthenticated, updateProviderById);
router.delete('/providers/:providerId', isAuthenticated, deleteProviderById);

export default router;
