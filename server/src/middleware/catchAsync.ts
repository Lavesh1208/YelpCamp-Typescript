import { Request, Response, NextFunction, RequestHandler } from 'express';
import { UpdateCampgroundInput } from '../schemas/campground.schema';

const catchAsync = <T extends Request, U>(
   func: (req: T, res: Response, next: NextFunction) => Promise<U>
): RequestHandler => {
   return (req: Request, res: Response, next: NextFunction) => {
      func(req as T, res, next).catch(next);
   };
};

export default catchAsync;
