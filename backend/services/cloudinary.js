import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";


dotenv.config();

// Configure Cloudinary (uses CLOUDINARY_URL from .env)
cloudinary.config();

export const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          resolve(null); // fail gracefully
        } else {
          resolve(result?.secure_url || null);
        }
      }
    );
    stream.end(fileBuffer);
  });
};

export default cloudinary;



