import Campground from '../models/campground.models';

export const findAllCampgrounds = async () => {
   return await Campground.find();
};

export const findCampgroundById = async (id: any) => {
   return await Campground.findById(id);
};

export const createCampground = async (input: any) => {
   return await Campground.create(input);
};

export const updateProduct = async (id: any, input: any) => {
   return await Campground.findByIdAndUpdate(id, input, { new: true });
};

export const deleteProduct = async (id: any) => {
   return await Campground.findByIdAndDelete(id);
};
