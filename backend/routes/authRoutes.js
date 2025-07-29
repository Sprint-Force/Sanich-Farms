import express from 'express';
import { forgotPassword, loginUser, registerUser, resetPassword } from '../controllers/UserController.js';


export const authRoutes = express.Router();

//Routes
authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.post('/forgot-password', forgotPassword);
authRoutes.post('/reset-password', resetPassword);
