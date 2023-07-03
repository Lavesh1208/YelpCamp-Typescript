import mongoose from 'mongoose';
import config from 'config';
import { Logger } from 'pino';
import logger from './logger';
import Campground from '../models/campground.models';

const log: Logger = logger.createLogger('dbConnection');

async function connect() {
   const dbUri = config.get<string>('dbUri');
   try {
      await mongoose.connect(dbUri);
      log.info('Database connected');
   } catch (e) {
      log.error('Database connection error', e);
      process.exit(1);
   }
}

export default connect;
