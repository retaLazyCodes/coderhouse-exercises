import winston from 'winston';

export const debugLogger = winston.createLogger({
  transports: [
    new winston.transports.File({ level: 'warn', filename: 'warn.log' }),
    new winston.transports.Console({ level: 'info', filename: 'info.log' }),
  ]
});


//Middlewares
export const logger = () => (req, res, next) => {
  req.logger = debugLogger;
  next();
}