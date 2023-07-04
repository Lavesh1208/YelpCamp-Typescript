import { ICampground } from '../interfaces/campground.interface';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema(
   {
      title: String,
      price: String,
      description: String,
      location: String,
   },
   {
      timestamps: true,
   }
);

const Campground = mongoose.model<ICampground>('Campground', CampgroundSchema);

export default Campground;
