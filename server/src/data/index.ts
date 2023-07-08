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
         const price = Math.floor(Math.random() * 50);
         const camp = new Campground({
            image: 'https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
            title: `${sample(descriptors)} ${sample(places)}`,
            price,
            location: `${data[random1000].city}, ${data[random1000].state}`,
            description:
               'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ipsum molestias aliquid cupiditate quaerat sed blanditiis maxime beatae repudiandae similique! Praesentium quasi, quis animi distinctio numquam ipsam. Maxime, beatae deserunt. Magni rerum fugit voluptas nostrum quidem praesentium a repudiandae totam harum quaerat, possimus blanditiis minima ad! Eos ullam pariatur earum fuga molestias doloremque placeat maiores, suscipit consectetur dolorum officia odio?',
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
