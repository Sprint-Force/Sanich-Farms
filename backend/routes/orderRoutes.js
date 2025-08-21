import express from 'express';
import { auth } from '../middlewares/auth.js';
import { createOrder, getSingleOrder, getOrders } from '../controllers/OrderController.js';
import { isAdmin } from '../middlewares/authorize.js';
import { cancelOrder, updateOrderStatus } from '../controllers/AdminController.js';


export const orderRoutes = express.Router();

orderRoutes.use(auth);

// Routes
orderRoutes.post('/', createOrder);
orderRoutes.get('/', getOrders);
orderRoutes.get('/:id', getSingleOrder);


orderRoutes.use(isAdmin);

// Protected routes
orderRoutes.patch('/:id/cancel', cancelOrder);
orderRoutes.patch('/:id/status', updateOrderStatus)

