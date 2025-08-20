import express from 'express';
import { getAllProducts, getSingleProduct } from '../controllers/ProductController.js';
import { isAdmin } from '../middlewares/authorize.js';
import { auth } from '../middlewares/auth.js';
import { addProduct, deleteProduct, editProduct } from '../controllers/AdminController.js';
import { upload } from '../middlewares/upload.js';

export const productRoutes = express.Router();

// Routes
productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', getSingleProduct)

// Middlewares
productRoutes.use(auth);
productRoutes.use(isAdmin);

// Protected routes (Admin only)
// productRoutes.post('/add', addProduct);
// productRoutes.patch('/:id/edit', editProduct);
// Add product (with optional image)
productRoutes.post("/add", upload.single("file"), addProduct);
// Edit product (with optional image)
productRoutes.patch("/:id/edit", upload.single("file"), editProduct);

productRoutes.delete('/:id/delete', deleteProduct);