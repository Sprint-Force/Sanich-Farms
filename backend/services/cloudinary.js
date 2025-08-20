import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";


dotenv.config();

// Configure Cloudinary (uses CLOUDINARY_URL from .env)
cloudinary.config();

export const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);   
        else resolve({
          url: result.secure_url,   
          id: result.public_id,     
        });
      }
    );
    stream.end(fileBuffer);
  });
};


export default cloudinary;



