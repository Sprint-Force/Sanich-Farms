import express from 'express';
import { getAllServices, getSingleService } from '../controllers/ServiceController.js';
import { addService, deleteService, editService } from '../controllers/AdminController.js';
import { isAdmin } from '../middlewares/authorize.js';
import { auth } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

export const serviceRoutes = express.Router();

// Routes
serviceRoutes.get('/', getAllServices);
serviceRoutes.get('/:id', getSingleService);


// Middlewares
serviceRoutes.use(auth);
serviceRoutes.use(isAdmin);

// Protected routes(Admin only)
serviceRoutes.post('/add', upload.single('file'), addService);
serviceRoutes.patch('/:id/edit', upload.single('file'), editService);
serviceRoutes.delete('/:id/delete', deleteService)

