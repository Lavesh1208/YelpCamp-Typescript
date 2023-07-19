import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import config from 'config';
import cookieParser from 'cookie-parser';
import campgroundRoutes from './routes/campground.routes';
import reviewRoutes from './routes/review.routes';
import userRoutes from './routes/user.routes';
import { Logger } from 'pino';
import logger from './utils/logger';
import connect from './utils/dbConnection';
import ExpressError from './utils/ExpressError';
import { getCurrentUserHandler } from './middleware/userMiddleware';

const log: Logger = logger.createLogger('app');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
   helmet.crossOriginResourcePolicy({
      policy: 'cross-origin',
   })
);
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
   cors({
      origin: 'http://localhost:5173',
      optionsSuccessStatus: 200,
      credentials: true,
   })
);

app.use(getCurrentUserHandler);

// ROUTES
app.use('/', campgroundRoutes);
app.use('/', reviewRoutes);
app.use('/', userRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
   next(new ExpressError('Page Not Found', 404));
});

const errorHandler = (
   err: ExpressError,
   req: Request,
   res: Response,
   next: NextFunction
): void => {
   const { statusCode = 500, message = 'Something went wrong' } = err;
   log.error(err);
   res.status(statusCode).send(message);
};

app.use(errorHandler);

const PORT = config.get<number>('port');

app.listen(PORT, async () => {
   await connect();
   log.info(`Listening on port http://localhost:${PORT}`);
});
