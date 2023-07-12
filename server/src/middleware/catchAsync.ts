import { Request, Response, NextFunction } from 'express';
import { UpdateCampgroundInput } from '../schemas/campground.schema';

const catchAsync = <T extends Request>(
   func: (req: T, res: Response, next: NextFunction) => Promise<any>
) => {
   return (req: T, res: Response, next: NextFunction) => {
      func(req, res, next).catch(next);
   };
};

export default catchAsync;
