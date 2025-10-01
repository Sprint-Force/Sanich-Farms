import express from "express";
import { getUsers } from "../controllers/AdminController.js";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/authorize.js";

export const adminRoutes = express.Router();
// Middleware
adminRoutes.use(auth);
adminRoutes.use(isAdmin);

// Routes
adminRoutes.get('/', getUsers); 