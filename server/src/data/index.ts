import mongoose from 'mongoose';
import Campground from '../models/campground.models';
import { data } from './cities';
import { descriptors, places } from './seedHelpers';

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

const sample = (array: string[]) =>
   array[Math.floor(Math.random() * array.length)];

function generateFileName(length: number = 10): string {
   const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let id = '';

   for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
   }

   return id;
}

export const seedDb = async () => {
   try {
      await connect();
      await Campground.deleteMany({});
      for (let i = 0; i < 50; i++) {
         const random1000 = Math.floor(Math.random() * 1000);
         const price = Math.floor(Math.random() * 50);
         const camp = new Campground({
            author: '64b43bfeebf23bee8c036cb3',
            images: {
               url: 'https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
               fileName: generateFileName(),
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            price,
            location: `${data[random1000].city}, ${data[random1000].state}`,
            description:
               'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ipsum molestias aliquid cupiditate quaerat sed blanditiis maxime beatae repudiandae similique! Praesentium quasi, quis animi distinctio numquam ipsam. Maxime, beatae deserunt. Magni rerum fugit voluptas nostrum quidem praesentium a repudiandae totam harum quaerat, possimus blanditiis minima ad! Eos ullam pariatur earum fuga molestias doloremque placeat maiores, suscipit consectetur dolorum officia odio?',
         });
         await camp.save();
      }
   } catch (e) {
      console.log('-----ERROR-----', e);
      process.exit(1);
   }
};

seedDb().then(() => {
   mongoose.connection.close();
});
