import express from 'express';
import { auth } from '../middlewares/auth.js';
import { cancelBooking, createBooking, getSingleBooking, getUserBookings, updateBooking } from '../controllers/BookingController.js';

export const bookingRoutes = express.Router();

bookingRoutes.use(auth);

// Routes
bookingRoutes.post('/', createBooking);
bookingRoutes.get('/', getUserBookings);
bookingRoutes.get('/:id', getSingleBooking);
bookingRoutes.patch('/:id', updateBooking);
bookingRoutes.patch('/:id/cancel', cancelBooking);