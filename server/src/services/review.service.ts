import Review from '../models/review.moddel';
import { IReviewInput } from '../interfaces/review.interface';

export const createReview = async (input: IReviewInput) => {
   return await Review.create(input);
};
