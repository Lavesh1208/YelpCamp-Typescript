import mongoose from 'mongoose';
import config from 'config';
import Campground from '../models/campground.models';
import { data } from './cities';
import { descriptors, places } from './seedHelpers';
import { Logger } from 'pino';
import logger from '../utils/logger';

const log: Logger = logger.createLogger('dbConnection');

async function connect() {
   const dbUri = config.get<string>('dbUri');
   try {
      await mongoose.connect(dbUri);
      log.info('Database connected');
   } catch (e) {
      log.error('Database connection error', e);
      process.exit(1);
   }
}

const sample = (array: string[]) =>
   array[Math.floor(Math.random() * array.length)];

export const seedDb = async () => {
   try {
      await connect();
      await Campground.deleteMany({});
      for (let i = 0; i < 50; i++) {
         const random1000 = Math.floor(Math.random() * 1000);
         const camp = new Campground({
            location: `${data[random1000].city}, ${data[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
         });
         await camp.save();
      }
   } catch (e) {
      log.error('-----ERROR-----', e);
      process.exit(1);
   }
};

seedDb().then(() => {
   mongoose.connection.close();
});
