import express from "express";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/authorize.js"
import { deleteNotification, getNotifications, markAllAsRead, markAsRead } from "../controllers/NotificationController.js";

export const notificationRoutes = express.Router();

notificationRoutes.use(auth);
notificationRoutes.use(isAdmin)

// Routes
notificationRoutes.get('/', getNotifications);
notificationRoutes.patch('/:id/read', markAsRead);
notificationRoutes.patch('/read-all', markAllAsRead);
notificationRoutes.delete('/:id', deleteNotification);