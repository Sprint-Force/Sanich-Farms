import express from 'express';
import { auth } from '../middlewares/auth.js';
import { cancelBooking, createBooking, getSingleBooking, getUserBookings, updateBooking } from '../controllers/BookingController.js';
import { isAdmin } from '../middlewares/authorize.js';
import { approveBooking, completeBooking, markBookingAsPaid, rejectBooking } from '../controllers/AdminController.js';

export const bookingRoutes = express.Router();

bookingRoutes.use(auth);

// Routes
bookingRoutes.post('/', createBooking);
bookingRoutes.get('/', getUserBookings);
bookingRoutes.get('/:id', getSingleBooking);
bookingRoutes.patch('/:id', updateBooking);
bookingRoutes.patch('/:id/cancel', cancelBooking);

// Middlewares
bookingRoutes.use(isAdmin);

// Protected routes (Admin only)
bookingRoutes.patch('/:id/approve', approveBooking);
bookingRoutes.patch('/:id/reject', rejectBooking);
bookingRoutes.patch('/:id/complete', completeBooking);
bookingRoutes.patch('/:id/paid', markBookingAsPaid);