import express from 'express';
import { auth } from '../middlewares/auth.js'
import { isAdmin } from '../middlewares/authorize.js';
import { addProduct, addService, deleteProduct, deleteService, editProduct, editService } 
from '../controllers/AdminController.js';

export const adminRoutes = express.Router();

// Middlewares
adminRoutes.use(auth);
adminRoutes.use(isAdmin);

// Routes
adminRoutes.post('/products', addProduct);
adminRoutes.patch('/products/:id', editProduct);
adminRoutes.delete('/products/:id', deleteProduct);

adminRoutes.post('/services', addService);
adminRoutes.patch('/services/:id', editService);
adminRoutes.delete('/services/:id', deleteService)

