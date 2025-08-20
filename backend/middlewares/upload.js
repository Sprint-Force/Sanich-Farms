import multer from "multer";

// Store file in memory (buffer) instead of disk
const storage = multer.memoryStorage();

export const upload = multer({ storage });


