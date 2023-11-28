import express from 'express';
import {
	getTaxes,
	getTaxById,
	createTax,
	updateTaxById,
	deleteTaxById,
} from '../controllers/Tax.controller.js';

import { isAuthenticated } from '../middleware/Auth.middleware.js';

const router = express.Router();

router.get('/taxes', isAuthenticated, getTaxes);
router.get('/taxes/:taxId', isAuthenticated, getTaxById);
router.post('/taxes', isAuthenticated, createTax);
router.put('/taxes/:taxId', isAuthenticated, updateTaxById);
router.delete('/taxes/:taxId', isAuthenticated, deleteTaxById);

export default router;
