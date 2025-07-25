import express from 'express';
import { loginUser, registerUser } from '../controllers/UserController.js';


export const authRoutes = express.Router();

//Routes
authRoutes.post('/register', registerUser);
authRoutes.post('/loginUser', loginUser);
