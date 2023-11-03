// const cloudinary = require('cloudinary').v2;
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_KEY,
   api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
   cloudinary,
   params: async (req, file) => {
      const folder = 'YelpCamp';
      const allowedFormats = ['jpg', 'jpeg', 'png'];
      return {
         folder,
         allowed_formats: allowedFormats.join(','),
      };
   },
});

export { cloudinary, storage };
