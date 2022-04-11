import { NextFunction, Request, Response } from 'express';
import { logger } from '../../logger';
import { AppError } from '../../errors/AppError';

export const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization as string;

  if (!authHeader || !parseInt(authHeader)) {
    logger.error('Aluno Id is missing in authorization.');
    throw new AppError('Aluno Id is missing in authorization.');
  }

  const id = parseInt(authHeader);

  request.user = {
    id,
  };

  return next();
};
