import express from 'express';
import { auth } from '../middlewares/auth.js';
import { cancelOrder, createOrder, getSingleOrder, getUserOrders } from '../controllers/OrderController.js';


export const orderRoutes = express.Router();

orderRoutes.use(auth);

// Routes
orderRoutes.post('/', createOrder);
orderRoutes.get('/', getUserOrders);
orderRoutes.get('/:id', getSingleOrder);
orderRoutes.patch('/:id/cancel', cancelOrder);
