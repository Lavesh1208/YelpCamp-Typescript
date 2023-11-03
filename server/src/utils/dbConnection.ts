import mongoose from 'mongoose';
import Campground from '../models/campground.models';

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
