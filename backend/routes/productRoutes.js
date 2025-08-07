import express from 'express';
import { getAllProducts, getSingleProduct } from '../controllers/ProductController.js';

export const productRoutes = express.Router();

// Routes
productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', getSingleProduct)