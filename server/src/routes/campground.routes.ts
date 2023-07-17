import express, { Request, Response } from 'express';
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
import { requireUser } from '../middleware/userMiddleware';

const router = express.Router();

router.get('/campgrounds', catchAsync(getCampgroundsHandler));

router.get('/campgrounds/:id', catchAsync(getCampgroundByIdHandler));

router.post(
   '/campgrounds',
   [validateResource(createCampgroundSchema), requireUser],
   catchAsync(createCampgroundHandler)
);

router.put(
   '/campgrounds/:id',
   [validateResource(createCampgroundSchema), requireUser],
   catchAsync(updateProductHandler)
);

router.delete(
   '/campgrounds/:id',
   validateResource(deleteCampgroundSchema),
   catchAsync(deleteProductHandler)
);

export default router;
