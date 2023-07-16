import { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { omit } from 'lodash';
import { CreateUserInput } from '../schemas/user.schema';
import { createUser, getUser } from '../services/user.service';
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
      return next(new ExpressError('Invalid  password', 401));
   }

   const token = singleUser.getJWTToken();

   const user = omit(singleUser.toJSON(), 'password');

   res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
   });
   res.send(user);
};
