import { Logger, pino } from 'pino';
import { loggerLevel } from '@core/domain/utils/readConfig';

const logger: Logger = pino({
  level: loggerLevel,
  transport: {
    target: 'pino-pretty',
  }
});

export { logger };
