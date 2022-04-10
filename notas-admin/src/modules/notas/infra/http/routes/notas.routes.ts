import { Router } from 'express';
import {
  makeCreateNotaHandler,
  makeFindAllNotaHandler,
} from 'src/modules/notas/factories/handlers';

const notasRouter = Router();

const createNotasHandle = makeCreateNotaHandler();
const findAllNotaHandler = makeFindAllNotaHandler();

notasRouter.post('/', createNotasHandle.handle.bind(createNotasHandle));
notasRouter.get('/', findAllNotaHandler.handle.bind(findAllNotaHandler));

export default notasRouter;
