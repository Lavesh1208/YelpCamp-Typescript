// const cloudinary = require('cloudinary').v2;
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import config from 'config';

cloudinary.config({
   cloud_name: config.get<string>('cloudinaryCloudName'),
   api_key: config.get<string>('cloudinaryKey'),
   api_secret: config.get<string>('cloudinarySecret'),
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
