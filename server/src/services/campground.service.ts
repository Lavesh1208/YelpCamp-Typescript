import Campground from '../models/campground.models';
import { ICampgroundInput } from '../interfaces/campground.interface';
import Review from '../models/review.moddel';

export const findAllCampgrounds = async () => {
   return await Campground.find();
};

export const findCampgroundById = async (id: string) => {
   return await Campground.findById(id)
      .populate({ path: 'reviews', populate: { path: 'author' } })
      .populate('author');
};

export const createCampground = async (input: ICampgroundInput) => {
   return await Campground.create(input);
};

export const updateCampground = async (id: string, input: ICampgroundInput) => {
   return await Campground.findByIdAndUpdate(id, input, { new: true });
};

export const deleteCampground = async (id: string) => {
   return await Campground.findByIdAndDelete(id);
};

export const updateCampgroundReviews = async (id: string, reviewId: string) => {
   await Campground.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
   });

   await Review.findByIdAndDelete(reviewId);
   return;
};
