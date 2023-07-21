import { TypeOf, array, number, object, string } from 'zod';

const payload = {
   body: object({
      title: string({
         required_error: 'Title is required',
      }),
      price: string({
         required_error: 'Price is required',
      }).min(0, 'Price must be greater than 0'),
      location: string({
         required_error: 'Location is required',
      }),
      description: string({
         required_error: 'Description is required',
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

const files = {
   files: array(
      object({
         fieldname: string(),
         originalname: string(),
         encoding: string(),
         mimetype: string(),
         path: string(),
         size: number(),
         filename: string(),
      })
   ),
};

export const getCampgroundSchema = object({
   ...params,
});

export const createCampgroundSchema = object({
   ...payload,
   ...files,
});

export const updateCampgroundSchema = object({
   ...payload,
   ...params,
   ...files,
});

export const deleteCampgroundSchema = object({
   ...params,
});

export type GetCampgroundInput = TypeOf<typeof getCampgroundSchema>;
export type CreateCampgroundInput = TypeOf<typeof createCampgroundSchema>;
export type UpdateCampgroundInput = TypeOf<typeof updateCampgroundSchema>;
export type DeleteCampgroundInput = TypeOf<typeof deleteCampgroundSchema>;
