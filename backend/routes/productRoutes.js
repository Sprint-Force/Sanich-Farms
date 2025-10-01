import express from 'express';
import { getAllProducts, getAllProductsAdmin, getRelatedProducts, getSingleProduct } from '../controllers/ProductController.js';
import { isAdmin } from '../middlewares/authorize.js';
import { auth } from '../middlewares/auth.js';
import { addProduct, deleteProduct, editProduct } from '../controllers/AdminController.js';
import { upload } from '../middlewares/upload.js';

export const productRoutes = express.Router();

// Routes
productRoutes.get('/', getAllProducts);
productRoutes.get('/all', auth, isAdmin, getAllProductsAdmin);
productRoutes.get('/:id', getSingleProduct);
productRoutes.get('/:id/related', getRelatedProducts);

// Middlewares
productRoutes.use(auth);
productRoutes.use(isAdmin);

// Add product (with image)
productRoutes.post("/add", upload.single("file"), addProduct);
// Edit product (with optional image)
productRoutes.patch("/:id/edit", upload.single("file"), editProduct);

productRoutes.delete('/:id/delete', deleteProduct);