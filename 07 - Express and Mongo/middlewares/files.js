import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// הגדרת הענן
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // תיקיית יעד
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const saveToStorage = multer({ storage });

export const saveToMemory = multer({ storage: multer.memoryStorage() });