import { ICampgroundDocument } from '../interfaces/campground.interface';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema(
   {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
      location: { type: String, required: true },
      reviews: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Review',
         },
      ],
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
