import { Router } from 'express';
import { authorizationMiddleware } from '../../../../../shared/http/middlewares';
import { makeFindAllNotaHandler } from '../../../factories/handlers';

const notasRouter = Router();

const findAllNotaHandler = makeFindAllNotaHandler();

notasRouter.get(
  '/',
  authorizationMiddleware,
  findAllNotaHandler.handle.bind(findAllNotaHandler),
);

export default notasRouter;
