import dotenv from 'dotenv';

dotenv.config();

export default {
   port: process.env.PORT,
   dbUri: process.env.MONGO_URI,
   saltWorkFactor: process.env.SALT_WORK_FACTOR,
   jwtSecret: process.env.JWT_SECRET,
   jwtExpires: process.env.JWT_EXPIRES,
   cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
   cloudinaryKey: process.env.CLOUDINARY_KEY,
   cloudinarySecret: process.env.CLOUDINARY_SECRET,
};
