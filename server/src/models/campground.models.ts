import { ICampgroundDocument } from '../interfaces/campground.interface';
import mongoose from 'mongoose';
import Review from './review.moddel';
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

CampgroundSchema.post(
   'findOneAndDelete',
   async function (doc: ICampgroundDocument) {
      if (doc) {
         await Review.deleteMany({ _id: { $in: doc.reviews } });
      }
   }
);

const Campground = mongoose.model<ICampgroundDocument>(
   'Campground',
   CampgroundSchema
);

export default Campground;
