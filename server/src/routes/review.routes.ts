import express from 'express';
import catchAsync from '../middleware/catchAsync';
import { createReviewHandler } from '../controllers/review.controller';
import validateResource from '../middleware/validateResource';
import { createReviewSchema } from '../schemas/review.schema';

const router = express.Router();

router.post(
   '/campgrounds/:id/reviews',
   validateResource(createReviewSchema),
   catchAsync(createReviewHandler)
);

export default router;
