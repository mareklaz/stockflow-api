import express from 'express';
import {
	getTaxes,
	getTaxById,
	createTax,
	updateTaxById,
	deleteTaxById,
} from '../controllers/Tax.controller.js';

import { isAuthenticated } from '../middleware/Auth.middleware.js';
import { isAdmin } from '../middleware/Admin.middleware.js';

const router = express.Router();

router.get('/taxes', isAuthenticated, getTaxes);
router.get('/taxes/:taxId', isAuthenticated, getTaxById);
router.post('/taxes', isAuthenticated, isAdmin, createTax);
router.put('/taxes/:taxId', isAuthenticated, isAdmin, updateTaxById);
router.delete('/taxes/:taxId', isAuthenticated, isAdmin, deleteTaxById);

export default router;
