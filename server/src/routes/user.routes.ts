import express from 'express';
import catchAsync from '../middleware/catchAsync';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';
import {
   loginUserHandler,
   registerUserHandler,
} from '../controllers/user.controller';
import validateResource from '../middleware/validateResource';

const router = express.Router();

router.post(
   '/register',
   validateResource(createUserSchema),
   catchAsync(registerUserHandler)
);

router.post(
   '/login',
   validateResource(loginUserSchema),
   catchAsync(loginUserHandler)
);

export default router;
