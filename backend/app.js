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
import { bookingRoutes } from "./routes/bookingRoutes.js";
import { serviceRoutes } from "./routes/serviceRoutes.js";
import { adminRoutes } from "./routes/adminRoutes.js"
import { uploadRoutes } from "./routes/uploadRoutes.js";



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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);


// Image upload route
app.use('/api/uploads', uploadRoutes);

// Error handler
app.use(errorHandler);


export default app;