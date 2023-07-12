import { TypeOf, number, object, string } from 'zod';

const payload = {
   body: object({
      campground: object({
         title: string({
            required_error: 'Title is required',
         }),
         price: number({
            required_error: 'Price is required',
         }).min(0, 'Price must be greater than 0'),
         location: string({
            required_error: 'Location is required',
         }),
         image: string({
            required_error: 'Image is required',
         }),
         description: string({
            required_error: 'Description is required',
         }),
      }),
   }),
};

const params = {
   params: object({
      id: string({
         required_error: 'Campground ID is required',
      }),
   }),
};

export const getCampgroundSchema = object({
   ...params,
});

export const createCampgroundSchema = object({
   ...payload,
});

export const updateCampgroundSchema = object({
   ...payload,
   ...params,
});

export const deleteCampgroundSchema = object({
   ...params,
});

export type GetCampgroundInput = TypeOf<typeof getCampgroundSchema>;
export type CreateCampgroundInput = TypeOf<typeof createCampgroundSchema>;
export type UpdateCampgroundInput = TypeOf<typeof updateCampgroundSchema>;
export type DeleteCampgroundInput = TypeOf<typeof deleteCampgroundSchema>;
