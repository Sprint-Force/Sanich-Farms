import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { authRoutes } from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { productRoutes } from "./routes/productRoutes.js";
import { cartRoutes } from "./routes/cartRoutes.js";
import { orderRoutes } from "./routes/orderRoutes.js";
import { wishlistRoutes } from "./routes/wishlistRoutes.js";




// Load env variables
dotenv.config();

//Run express app
const app = express();


//Middlewares
app.use(cors({
    origin: "https://sanich-farms.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(morgan('dev'));
// JSON Parser
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Error handler
app.use(errorHandler);


export default app;