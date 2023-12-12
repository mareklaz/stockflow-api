import express from 'express';
import {
	getProducts,
	getProductById,
	createProduct,
	updateProductById,
	deleteProductById,
} from '../controllers/Product.controller.js';

import { isAuthenticated } from '../middleware/Auth.middleware.js';
import { isAdmin } from '../middleware/Admin.middleware.js';

const router = express.Router();

router.get('/products', isAuthenticated, getProducts);
router.get('/products/:productId', isAuthenticated, getProductById);
router.post('/products', isAuthenticated, isAdmin, createProduct);
router.put('/products/:productId', isAuthenticated, isAdmin, updateProductById);
router.delete('/products/:productId', isAuthenticated, isAdmin, deleteProductById);

export default router;
