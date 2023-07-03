import pino, { Logger } from 'pino';

class Log {
   public createLogger(name: string): Logger {
      return pino({
         name,
         transport: {
            target: 'pino-pretty',
            options: {
               colorize: true,
            },
         },
      });
   }
}

const logger: Log = new Log();
export default logger;
