import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

async function connect() {
   const dbUri = process.env.MONGO_URI as string;
   try {
      await mongoose.connect(dbUri);
      console.log('Database connected');
   } catch (e) {
      console.log('Database connection error', e);
      process.exit(1);
   }
}

export default connect;
