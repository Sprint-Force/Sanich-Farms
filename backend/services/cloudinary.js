import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";


dotenv.config();

// Configure Cloudinary (uses CLOUDINARY_URL from .env)
cloudinary.config();



export default cloudinary;



