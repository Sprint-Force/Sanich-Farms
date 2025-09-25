import express from 'express';
import { autocomplete, search } from '../controllers/SearchController.js';

export const searchRoutes = express.Router();

// Routes
searchRoutes.get('/', search);
searchRoutes.get('/autocomplete', autocomplete);