import dotenv from 'dotenv';

dotenv.config();

export default {
   port: process.env.PORT,
   dbUri: process.env.MONGO_URI,
   saltWorkFactor: process.env.SALT_WORK_FACTOR,
   jwtSecret: process.env.JWT_SECRET,
   jwtExpires: process.env.JWT_EXPIRES,
};
