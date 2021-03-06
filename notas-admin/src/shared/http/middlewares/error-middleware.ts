import { NextFunction, Request, Response } from 'express';
import { logger } from '../../../shared/logger';
import { AppError } from '../../errors/AppError';

export const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  console.log(error);
  logger.error(JSON.stringify(error));

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
