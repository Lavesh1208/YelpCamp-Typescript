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

const router = express.Router();

router.get('/campgrounds', catchAsync(getCampgroundsHandler));

router.get('/campgrounds/:id', catchAsync(getCampgroundByIdHandler));

router.post(
   '/campgrounds',
   validateResource(createCampgroundSchema),
   catchAsync(createCampgroundHandler)
);

router.put(
   '/campgrounds/:id',
   validateResource(updateCampgroundSchema),
   catchAsync(updateProductHandler)
);

router.delete(
   '/campgrounds/:id',
   validateResource(deleteCampgroundSchema),
   catchAsync(deleteProductHandler)
);

export default router;
