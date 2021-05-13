import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),

      ),
    }),
  ],
});

logger.stream = {
  write(message) {
    logger.info(message.trim());
  },
};

export default logger;
