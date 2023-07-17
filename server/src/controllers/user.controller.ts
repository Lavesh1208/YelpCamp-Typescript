import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';
import jwt from 'jsonwebtoken';
import config from 'config';
import { CreateUserInput } from '../schemas/user.schema';
import { createUser, getUser, getUserById } from '../services/user.service';
import { IUserDocument } from '../interfaces/user.interface';
import ExpressError from '../utils/ExpressError';

export const registerUserHandler = async (
   req: Request<{}, {}, CreateUserInput['body']>,
   res: Response
) => {
   const newUser: IUserDocument = await createUser(req.body);

   const token = await newUser.getJWTToken();

   const user = omit(newUser.toJSON(), 'password');

   res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
   });
   res.send(user);
};

export const loginUserHandler = async (
   req: Request<{}, {}, CreateUserInput['body']>,
   res: Response,
   next: NextFunction
) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return next(new ExpressError('Please provide email and password', 400));
   }

   const singleUser = await getUser({ email });

   if (!singleUser) {
      return next(new ExpressError('Invalid email or password', 401));
   }

   const isPasswordMatched = await singleUser.comparePassword(password);

   if (!isPasswordMatched) {
      return next(new ExpressError('Invalid email or password', 401));
   }

   const token = singleUser.getJWTToken();

   const user = omit(singleUser.toJSON(), 'password');

   res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
   });
   res.send(user);
};

export const logoutUserHandler = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   console.log('checkLogout middleware applied');
   res.cookie('token', '', {
      httpOnly: true,
      maxAge: 1,
   });
   console.log(res.cookie);
   res.send('Logged Out');
};

export const getCurrentUserHandler = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   console.log('checkCurrentUser middleware applied');
   const token = req.cookies.token;
   if (!token) {
      res.send(null);
   }

   jwt.verify(
      token,
      config.get<string>('jwtSecret'),
      async (err: any, decodedToken: any) => {
         if (err) {
            res.locals.user = null;
         } else {
            const singleUser = await getUserById(decodedToken._id);
            if (!singleUser) {
               res.send(null);
            } else {
               const user = omit(singleUser.toJSON(), 'password');
               res.send(user);
            }
         }
      }
   );
};
