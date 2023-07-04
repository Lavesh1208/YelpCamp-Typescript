import express, { Request, Response } from 'express';
import {
   getCampgroundsHandler,
   getCampgroundByIdHandler,
   createCampgroundHandler,
   updateProductHandler,
   deleteProductHandler,
} from '../controllers/campground.controller';

const router = express.Router();

router.get('/campgrounds', getCampgroundsHandler);

router.get('/campgrounds/:id', getCampgroundByIdHandler);

router.post('/campgrounds', createCampgroundHandler);

router.put('/campgrounds/:id', updateProductHandler);

router.delete('/campgrounds/:id', deleteProductHandler);

export default router;
