import { Request, Response } from 'express';
import { cloudinary } from '../cloudinaryConfig';
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

type CreateCampgroundRequest = Request<
   {},
   {},
   CreateCampgroundInput['body']
> & {
   files: Express.Multer.File[];
};

type UpdateCampgroundRequest = Request<
   UpdateCampgroundInput['params'],
   {},
   UpdateCampgroundInput['body']
> & {
   files: Express.Multer.File[];
};

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
   req: CreateCampgroundRequest,
   res: Response
) => {
   const campground = await createCampground(req.body);
   campground.images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
   }));
   campground.author = req.cookies.user._id;
   await campground.save();
   console.log('Campground---', campground);
   res.send(campground);
};

export const updateProductHandler = async (
   req: UpdateCampgroundRequest,
   res: Response
) => {
   const { id } = req.params;
   const campground = await updateCampground(id, { ...req.body });
   if (!campground) {
      return res.status(404).send('Campground not found');
   }
   const imageArray = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
   }));
   campground.images.push(...imageArray);
   await campground.save();
   if (req.body.deleteImages) {
      const deleteImagesArray = req.body.deleteImages.split(',');
      console.log('deleteImagesArray', deleteImagesArray);
      for (let filename of deleteImagesArray) {
         await cloudinary.uploader.destroy(filename);
      }
      await campground.updateOne({
         $pull: { images: { filename: { $in: deleteImagesArray } } },
      });
      console.log(campground);
   }
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
