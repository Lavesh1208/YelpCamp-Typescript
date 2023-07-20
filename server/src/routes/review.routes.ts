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
import { isReviewAuthor, requireUser } from '../middleware/userMiddleware';

const router = express.Router();

router.post(
   '/campgrounds/:id/reviews',
   [validateResource(createReviewSchema), requireUser],
   catchAsync(createReviewHandler)
);

router.delete(
   '/campgrounds/:id/reviews/:reviewId',
   [validateResource(deleteReviewSchema), requireUser, isReviewAuthor],
   catchAsync(deleteReviewHandler)
);

export default router;
