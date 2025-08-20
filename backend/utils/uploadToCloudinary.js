import cloudinary from "../services/cloudinary.js";


export const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
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