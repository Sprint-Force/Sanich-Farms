import express from 'express';
import { getAllServices, getSingleService } from '../controllers/ServiceController.js';

export const serviceRoutes = express.Router();

// Routes
serviceRoutes.get('/', getAllServices);
serviceRoutes.get('/:id', getSingleService);


