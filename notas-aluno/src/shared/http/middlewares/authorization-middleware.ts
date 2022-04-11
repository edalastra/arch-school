import { NextFunction, Request, Response } from 'express';
import { logger } from '../../logger';
import { AppError } from '../../errors/AppError';

export const authorizationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization as string;

  if (!authHeader || !parseInt(authHeader)) {
    logger.error('Aluno Id is missing in authorization.');
    throw new AppError('Aluno Id is missing in authorization.');
  }

  const id = Number(authHeader);

  request.user = {
    id,
  };

  return next();
};
