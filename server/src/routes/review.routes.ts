import express from 'express';
import catchAsync from '../middleware/catchAsync';
import {
   createReviewHandler,
   deleteReviewHandler,
} from '../controllers/review.controller';
import validateResource from '../middleware/validateResource';
import {
   createReviewSchema,
   deleteReviewSchema,
} from '../schemas/review.schema';

const router = express.Router();

router.post(
   '/campgrounds/:id/reviews',
   validateResource(createReviewSchema),
   catchAsync(createReviewHandler)
);

router.delete(
   '/campgrounds/:id/reviews/:reviewId',
   validateResource(deleteReviewSchema),
   catchAsync(deleteReviewHandler)
);

export default router;
