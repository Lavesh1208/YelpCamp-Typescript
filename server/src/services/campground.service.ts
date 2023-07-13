import Campground from '../models/campground.models';
import { ICampgroundInput } from '../interfaces/campground.interface';

export const findAllCampgrounds = async () => {
   return await Campground.find();
};

export const findCampgroundById = async (id: string) => {
   return await Campground.findById(id).populate('reviews');
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
   return await Campground.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
   });
};
