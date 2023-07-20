import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import ExpressError from '../utils/ExpressError';
import { omit } from 'lodash';
import { findCampgroundById } from '../services/campground.service';
import { getUserById } from '../services/user.service';
import { findReview } from '../services/review.service';

export const requireUser = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const token = req.cookies.token;
   if (!token) {
      return next(new ExpressError('You must be Logged In', 401));
   }

   jwt.verify(
      token,
      config.get<string>('jwtSecret'),
      (err: any, decodedToken: any) => {
         if (err) {
            console.log(err);
            return next();
         } else {
            return next();
         }
      }
   );
};

export const getCurrentUserHandler = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const token = req.cookies.token;
   if (!token) {
      res.cookie('user', null);
      next();
      return;
   }

   jwt.verify(
      token,
      config.get<string>('jwtSecret'),
      async (err: any, decodedToken: any) => {
         if (err) {
            res.cookie('user', null);
            next();
            return;
         } else {
            const singleUser = await getUserById(decodedToken._id);
            if (!singleUser) {
               res.cookie('user', null);
               next();
               return;
            } else {
               const user = omit(singleUser.toJSON(), 'password');
               res.cookie('user', user);
               next();
               return;
            }
         }
      }
   );
};

export const isAuthor = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const { id } = req.params;
   const campground = await findCampgroundById(id);
   if (!campground) {
      return next(new ExpressError('Campground not found', 404));
   }
   const authorId = campground.author._id.toString();
   const userId = req.cookies.user._id;
   if (authorId !== userId) {
      return next(
         new ExpressError("You don't have permission to do that", 401)
      );
   }
   next();
};

export const isReviewAuthor = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const { reviewId } = req.params;
   const review = await findReview(reviewId);
   if (!review) {
      return next(new ExpressError('Review not found', 404));
   }
   const authorId = review.author._id.toString();
   const userId = req.cookies.user._id;
   if (authorId !== userId) {
      return next(
         new ExpressError("You don't have permission to do that", 401)
      );
   }
   next();
};
