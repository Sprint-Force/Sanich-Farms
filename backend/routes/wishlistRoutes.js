import express from 'express';
import { auth } from '../middlewares/auth.js';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/WishlistController.js';


export const wishlistRoutes = express.Router();

wishlistRoutes.use(auth);

wishlistRoutes.post('/:id', addToWishlist);
wishlistRoutes.get('/', getWishlist);
wishlistRoutes.delete('/:productId', removeFromWishlist);