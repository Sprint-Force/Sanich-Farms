import express from 'express';
import { auth } from '../middlewares/auth.js';
import { addToCart, clearCart, removeFromCart, updateCartItem, viewCart } from '../controllers/CartItemController.js';

export const cartRoutes = express.Router();

//Routes
cartRoutes.use(auth);

cartRoutes.post('/', addToCart);
cartRoutes.delete('/clear', clearCart);
cartRoutes.delete('/:productId', removeFromCart);
cartRoutes.put('/:productId', updateCartItem);
cartRoutes.get('/', viewCart);