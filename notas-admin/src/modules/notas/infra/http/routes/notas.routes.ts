import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import {
  makeCreateNotaHandler,
  makeFindAllNotaHandler,
  makeUpdateNotaHandler,
} from '../../../factories/handlers';

const notasRouter = Router();

const createNotasHandle = makeCreateNotaHandler();
const findAllNotaHandler = makeFindAllNotaHandler();
const updateNotaHandler = makeUpdateNotaHandler();

notasRouter.get('/', findAllNotaHandler.handle.bind(findAllNotaHandler));

notasRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      alunoId: Joi.number().integer().required(),
      valor: Joi.number().max(10).min(0).required(),
    },
  }),
  createNotasHandle.handle.bind(createNotasHandle),
);

notasRouter.post(
  '/:notaId',
  celebrate({
    [Segments.PARAMS]: {
      notaId: Joi.number().integer().required(),
    },
    [Segments.BODY]: {
      valor: Joi.number().max(10).min(0).required(),
    },
  }),
  updateNotaHandler.handle.bind(updateNotaHandler),
);

export default notasRouter;
