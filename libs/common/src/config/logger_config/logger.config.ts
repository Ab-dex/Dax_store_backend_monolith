import {
  WinstonModule,
  utilities as NestWinstonModuleUtility,
} from 'nest-winston';
import { format, transports } from 'winston';

const errorFilter = format((info, opts) => {
  return info.level === 'error' ? info : false;
});

const infoFilter = format((info, opts) => {
  return info.level === 'info' ? info : false;
});

const winstonTransports = [
  new transports.File({
    filename: './logs/app-info.log',
    level: 'debug',
    format: format.combine(
      infoFilter(),
      format.colorize({ all: true }),
      format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss',
      }),
      format.align(),
      format.json(),
      format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
      ),
    ),
  }),
  new transports.File({
    filename: './logs/errorlog.txt',
    level: 'error',
    format: format.combine(
      errorFilter(),
      format.colorize({ all: true }),
      format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss',
      }),
      format.align(),
      format.json(),
      format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
      ),
    ),
  }),
  new transports.Console({
    level: 'debug',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss',
      }),
      format.align(),
      NestWinstonModuleUtility.format.nestLike('Store', {
        colors: true,
        prettyPrint: true,
      }),
    ),
  }),
];

export const LoggerFactory = () => {
  return WinstonModule.createLogger({
    level: 'info',
    transports: winstonTransports,
    exceptionHandlers: [
      new transports.File({
        filename: './logs/exceptions.log',
        maxsize: 5242880,
      }),
    ],
    exitOnError: true,
  });
};
