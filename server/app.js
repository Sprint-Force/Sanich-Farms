import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";




// Load env variables
dotenv.config();

//Run express app
const app = express();

// JSON Parser
app.use(express.json());


//Middlewares
app.use(cors());
app.use(morgan('dev'));


export default app;