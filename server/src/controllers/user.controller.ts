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
   res.cookie('user', user);
   res.send(user);
};

export const logoutUserHandler = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   res.cookie('token', '', {
      httpOnly: true,
      maxAge: 1,
   });
   res.cookie('user', null);
   res.send('Logged Out');
};
