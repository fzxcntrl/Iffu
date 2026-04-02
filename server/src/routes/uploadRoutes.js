import path from 'path';
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import { protect, admin } from '../middlewares/authMiddleware.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'iffu_products',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  },
});

const upload = multer({ storage: storage });

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  res.send({ message: 'Image Uploaded', url: req.file.path });
});

export default router;
