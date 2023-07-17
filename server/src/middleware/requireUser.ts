import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import ExpressError from '../utils/ExpressError';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
   const token = req.cookies.token;
   if (!token) {
      return next(new ExpressError('You must be logged in', 401));
   }

   jwt.verify(
      token,
      config.get<string>('jwtSecret'),
      (err: any, decodedToken: any) => {
         if (err) {
            return res.send(
               new ExpressError('Session expired, Please Login again!', 401)
            );
         } else {
            console.log(decodedToken);
            return next();
         }
      }
   );
};

export default requireUser;
