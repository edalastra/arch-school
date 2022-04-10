import { createLogger, transports, config } from 'winston';

export const logger = createLogger({
  levels: config.syslog.levels,
  transports: [new transports.Console()],
});
