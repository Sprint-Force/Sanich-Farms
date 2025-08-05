import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { authRoutes } from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { productRoutes } from "./routes/productRoutes.js";
import { cartRoutes } from "./routes/cartRoutes.js";
import { orderRoutes } from "./routes/orderRoutes.js";




// Load env variables
dotenv.config();

//Run express app
const app = express();

// JSON Parser
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

//Middlewares
app.use(cors());
app.use(morgan('dev'));
// Error handler
app.use(errorHandler);


export default app;