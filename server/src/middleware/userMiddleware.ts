import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import ExpressError from '../utils/ExpressError';
import { getUserById } from '../services/user.service';
import { omit } from 'lodash';

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

export const getCurrentUserHandler = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   console.log('checkLogout middleware applied');
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
