import { ICampgroundDocument } from '../interfaces/campground.interface';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema(
   {
      title: String,
      price: String,
      image: String,
      description: String,
      location: String,
   },
   {
      timestamps: true,
   }
);

const Campground = mongoose.model<ICampgroundDocument>(
   'Campground',
   CampgroundSchema
);

export default Campground;
