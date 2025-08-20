import express from 'express';
import { auth } from '../middlewares/auth.js';
import { createOrder, getSingleOrder, getUserOrders } from '../controllers/OrderController.js';
import { isAdmin } from '../middlewares/authorize.js';
import { cancelOrder, getAllOrders, updateOrderStatus } from '../controllers/AdminController.js';


export const orderRoutes = express.Router();

orderRoutes.use(auth);

// Routes
orderRoutes.post('/', createOrder);
orderRoutes.get('/', getUserOrders);
orderRoutes.get('/:id', getSingleOrder);


orderRoutes.use(isAdmin);

// Protected routes
orderRoutes.patch('/:id/cancel', cancelOrder);
orderRoutes.patch('/:id/status', updateOrderStatus)
orderRoutes.get('/all', getAllOrders);
