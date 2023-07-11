import express, { Request, Response } from 'express';
import {
   getCampgroundsHandler,
   getCampgroundByIdHandler,
   createCampgroundHandler,
   updateProductHandler,
   deleteProductHandler,
} from '../controllers/campground.controller';
import catchAsync from '../utils/catchAsync';

const router = express.Router();

router.get('/campgrounds', catchAsync(getCampgroundsHandler));

router.get('/campgrounds/:id', catchAsync(getCampgroundByIdHandler));

router.post('/campgrounds', catchAsync(createCampgroundHandler));

router.put('/campgrounds/:id', catchAsync(updateProductHandler));

router.delete('/campgrounds/:id', catchAsync(deleteProductHandler));

export default router;
