import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { authRoutes } from "./routes/authRoutes.js";




// Load env variables
dotenv.config();

//Run express app
const app = express();

// JSON Parser
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes)

//Middlewares
app.use(cors());
app.use(morgan('dev'));


export default app;