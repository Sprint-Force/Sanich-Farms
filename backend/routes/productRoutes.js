import express from 'express';
import { getAllproducts } from '../controllers/ProductController.js';

export const productRoutes = express.Router();

// Routes
productRoutes.get('/', getAllproducts);