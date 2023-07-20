import { Request, Response } from 'express';
import {
   createCampground,
   deleteCampground,
   findAllCampgrounds,
   findCampgroundById,
   updateCampground,
} from '../services/campground.service';
import { Logger } from 'pino';
import logger from '../utils/logger';
import {
   CreateCampgroundInput,
   DeleteCampgroundInput,
   GetCampgroundInput,
   UpdateCampgroundInput,
} from '../schemas/campground.schema';

const log: Logger = logger.createLogger('campground controller');

export const getCampgroundsHandler = async (req: Request, res: Response) => {
   const campgrounds = await findAllCampgrounds();
   res.send(campgrounds);
};

export const getCampgroundByIdHandler = async (
   req: Request<GetCampgroundInput['params']>,
   res: Response
) => {
   const campground = await findCampgroundById(req.params.id);
   res.send(campground);
};

export const createCampgroundHandler = async (
   req: Request<{}, {}, CreateCampgroundInput['body']>,
   res: Response
) => {
   const campground = await createCampground(req.body.campground);
   campground.author = req.cookies.user._id;
   await campground.save();
   res.send(campground);
};

export const updateProductHandler = async (
   req: Request<
      UpdateCampgroundInput['params'],
      {},
      UpdateCampgroundInput['body']
   >,
   res: Response
) => {
   const { id } = req.params;
   const campground = await updateCampground(id, { ...req.body.campground });
   res.send(campground);
};

export const deleteProductHandler = async (
   req: Request<DeleteCampgroundInput['params']>,
   res: Response
) => {
   const { id } = req.params;
   await deleteCampground(id);
   res.json({ message: 'Campground Deleted' });
};
