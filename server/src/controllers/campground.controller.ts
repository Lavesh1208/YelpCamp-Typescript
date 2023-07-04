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

const log: Logger = logger.createLogger('campground controller');

export const getCampgroundsHandler = async (req: Request, res: Response) => {
   const campgrounds = await findAllCampgrounds();
   res.send(campgrounds);
};

export const getCampgroundByIdHandler = async (req: Request, res: Response) => {
   const campground = await findCampgroundById(req.params.id);
   res.send(campground);
};

export const createCampgroundHandler = async (req: Request, res: Response) => {
   const campground = await createCampground(req.body.campground);
   res.send(campground);
};

export const updateProductHandler = async (req: Request, res: Response) => {
   const { id } = req.params;
   const campground = await updateProduct(id, { ...req.body.campground });
   res.send(campground);
};

export const deleteProductHandler = async (req: Request, res: Response) => {
   const { id } = req.params;
   await deleteProduct(id);
   res.send('Deleted');
};
