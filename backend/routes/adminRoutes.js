import express from 'express';
import { auth } from '../middlewares/auth.js'
import { isAdmin } from '../middlewares/authorize.js';
import { addProduct, addService, approveBooking, completeBooking, deleteProduct, deleteService, editProduct, editService, markBookingAsPaid, rejectBooking } 
from '../controllers/AdminController.js';

export const adminRoutes = express.Router();

// Middlewares
adminRoutes.use(auth);
adminRoutes.use(isAdmin);

// Routes
adminRoutes.post('/add', addProduct);
adminRoutes.patch('/:id/edit', editProduct);
adminRoutes.delete('/:id/delete', deleteProduct);

adminRoutes.post('/add', addService);
adminRoutes.patch('/:id/edit', editService);
adminRoutes.delete('/:id/delete', deleteService)


adminRoutes.patch('/:id/approve', approveBooking);
adminRoutes.patch('/:id/reject', rejectBooking);
adminRoutes.patch('/:id/complete', completeBooking);
adminRoutes.patch('/:id/paid', markBookingAsPaid);

