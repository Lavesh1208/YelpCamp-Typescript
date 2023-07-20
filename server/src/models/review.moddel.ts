import { IReviewDocument } from 'interfaces/review.interface';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
   {
      body: { type: String, required: true },
      rating: { type: Number, required: true },
      author: {
         type: Schema.Types.ObjectId,
         ref: 'User',
      },
   },
   {
      timestamps: true,
   }
);

const Review = mongoose.model<IReviewDocument>('Review', reviewSchema);

export default Review;
