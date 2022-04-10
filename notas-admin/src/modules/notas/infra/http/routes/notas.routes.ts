import { Router } from 'express';
import {
  makeCreateNotaHandler,
  makeFindAllNotaHandler,
} from 'src/modules/notas/factories/handlers';
import { makeUpdateNotaHandler } from 'src/modules/notas/factories/handlers/update-nota-handler.factory';

const notasRouter = Router();

const createNotasHandle = makeCreateNotaHandler();
const findAllNotaHandler = makeFindAllNotaHandler();
const updateNotaHandler = makeUpdateNotaHandler();

notasRouter.post('/', createNotasHandle.handle.bind(createNotasHandle));
notasRouter.get('/', findAllNotaHandler.handle.bind(findAllNotaHandler));
notasRouter.post('/:notaId', updateNotaHandler.handle.bind(updateNotaHandler));

export default notasRouter;
