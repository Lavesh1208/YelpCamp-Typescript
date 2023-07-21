import express, { Request, Response } from 'express';
import multer from 'multer';
import { storage } from '../cloudinaryConfig';
import {
   getCampgroundsHandler,
   getCampgroundByIdHandler,
   createCampgroundHandler,
   updateProductHandler,
   deleteProductHandler,
} from '../controllers/campground.controller';
import catchAsync from '../middleware/catchAsync';
import validateResource from '../middleware/validateResource';
import {
   createCampgroundSchema,
   deleteCampgroundSchema,
   updateCampgroundSchema,
} from '../schemas/campground.schema';
import { isAuthor, requireUser } from '../middleware/userMiddleware';

const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/campgrounds', catchAsync(getCampgroundsHandler));

router.get('/campgrounds/:id', catchAsync(getCampgroundByIdHandler));

router.post(
   '/campgrounds',
   [
      upload.array('image'),
      validateResource(createCampgroundSchema),
      requireUser,
   ],
   catchAsync(createCampgroundHandler)
);

router.put(
   '/campgrounds/:id',
   [upload.array('image'), requireUser, isAuthor],
   catchAsync(updateProductHandler)
);

router.delete(
   '/campgrounds/:id',
   [validateResource(deleteCampgroundSchema), requireUser, isAuthor],
   catchAsync(deleteProductHandler)
);

export default router;
