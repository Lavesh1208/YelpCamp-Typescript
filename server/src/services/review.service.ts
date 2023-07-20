import Review from '../models/review.moddel';
import { IReviewInput } from '../interfaces/review.interface';

export const createReview = async (input: IReviewInput) => {
   return await Review.create(input);
};

export const findReview = async (id: string) => {
   return await Review.findById(id);
};

export const deleteReview = async (id: string) => {
   return await Review.findByIdAndDelete(id);
};
