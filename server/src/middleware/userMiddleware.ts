import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import ExpressError from '../utils/ExpressError';
import { getUserById } from '../services/user.service';

export const requireUser = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const token = req.cookies.token;
   if (!token) {
      return next(new ExpressError('You must be logged in', 401));
   }

   jwt.verify(
      token,
      config.get<string>('jwtSecret'),
      (err: any, decodedToken: any) => {
         if (err) {
            console.log(err);
            return next();
         } else {
            console.log(decodedToken);
            return next();
         }
      }
   );
};

export const checkCurrentUser = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   console.log('checkCurrentUser middleware applied');
   const token = req.cookies.token;
   if (!token) {
      res.locals.user = null;
      next();
   }

   jwt.verify(
      token,
      config.get<string>('jwtSecret'),
      async (err: any, decodedToken: any) => {
         if (err) {
            res.locals.user = null;
            next();
         } else {
            let user = await getUserById(decodedToken._id);
            res.locals.user = user;
            console.log('res.locals.user', res.locals);
            next();
         }
      }
   );
};
