import express from 'express';
import { forgotPassword, getProfile, loginUser, registerUser, resetPassword, updateProfile } from '../controllers/UserController.js';
import { auth } from '../middlewares/auth.js';


export const authRoutes = express.Router();



//Routes
authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.post('/forgot-password', forgotPassword);
authRoutes.post('/reset-password', resetPassword);

authRoutes.use(auth);
// Protected routes
authRoutes.get('/users/me', getProfile);
authRoutes.put('/users/me', updateProfile);