import { TypeOf, number, object, string } from 'zod';

const payload = {
   body: object({
      review: object({
         rating: number({
            required_error: 'Rating is required',
         })
            .min(0, 'Rating must be greater than 0')
            .max(5, 'Rating must be less than or equal to 5'),
         body: string({
            required_error: 'Body is required',
         }),
      }),
   }),
};

const params = {
   params: object({
      id: string({
         required_error: 'Review id is required',
      }),
   }),
};

export const createReviewSchema = object({
   ...payload,
   ...params,
});

export type CreateReviewInput = TypeOf<typeof createReviewSchema>;
