import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { omit } from 'lodash';
import { findCampgroundById } from '../services/campground.service';
import { findReview } from '../services/review.service';
import { getUserById } from '../services/user.service';
import ExpressError from '../utils/ExpressError';

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
      process.env.JWT_SECRET as string,
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
      res.cookie('user', null, {
         httpOnly: true,
         expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
         sameSite: 'none',
         secure: true,
      });
      next();
      return;
   }

   jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      async (err: any, decodedToken: any) => {
         if (err) {
            res.cookie('user', null, {
               httpOnly: true,
               expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
               sameSite: 'none',
               secure: true,
            });
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
               res.cookie('user', user, {
                  httpOnly: true,
                  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                  sameSite: 'none',
                  secure: true,
               });
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
