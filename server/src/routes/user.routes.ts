import express from 'express';
import catchAsync from '../middleware/catchAsync';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';
import {
   getCurrentUserHandler,
   loginUserHandler,
   logoutUserHandler,
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

router.get('/currentUser', catchAsync(getCurrentUserHandler));

router.post('/logout', catchAsync(logoutUserHandler));

export default router;
