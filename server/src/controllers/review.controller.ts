import { Request, Response } from 'express';
import { Logger } from 'pino';
import logger from '../utils/logger';
import {
   findCampgroundById,
   updateCampgroundReviews,
} from '../services/campground.service';
import { createReview, deleteReview } from '../services/review.service';
import { CreateReviewInput, DeleteReviewInput } from '../schemas/review.schema';

const log: Logger = logger.createLogger('review controller');

export const createReviewHandler = async (
   req: Request<CreateReviewInput['params'], {}, CreateReviewInput['body']>,
   res: Response
) => {
   const { id } = req.params;
   const campground = await findCampgroundById(id);
   const review = await createReview(req.body.review);
   campground?.reviews.push(review);
   await campground?.save();
   res.send(campground);
};

export const deleteReviewHandler = async (
   req: Request<DeleteReviewInput['params']>,
   res: Response
) => {
   const { id, reviewId } = req.params;
   const campground = await updateCampgroundReviews(id, reviewId);
   await deleteReview(id);
   res.json({ message: 'Review Deleted' });
};
