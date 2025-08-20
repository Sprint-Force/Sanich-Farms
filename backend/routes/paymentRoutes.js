import express from 'express';
import { auth } from '../middlewares/auth.js';
import { initiatePayment, paystackWebhook, verifyPayment } from '../controllers/PaymentController.js';


export const paymentRoutes = express.Router();

paymentRoutes.post('/paystack/webhook', paystackWebhook);

paymentRoutes.use(auth);
paymentRoutes.post('/initialize', initiatePayment);
paymentRoutes.get('/verify/:reference', verifyPayment);