import { Request, Response } from 'express';
import {
   createCampground,
   deleteProduct,
   findAllCampgrounds,
   findCampgroundById,
   updateProduct,
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
   console.log(campground);
   res.send(campground);
};

export const createCampgroundHandler = async (
   req: Request<{}, {}, CreateCampgroundInput['body']>,
   res: Response
) => {
   const campground = await createCampground(req.body.campground);
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
   const campground = await updateProduct(id, { ...req.body.campground });
   res.send(campground);
};

export const deleteProductHandler = async (
   req: Request<DeleteCampgroundInput['params']>,
   res: Response
) => {
   const { id } = req.params;
   await deleteProduct(id);
   res.send('Deleted');
};
