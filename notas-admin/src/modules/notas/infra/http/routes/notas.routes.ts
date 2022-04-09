import { Router } from 'express';
import { makeNotasHandler } from 'src/modules/notas/factories/handlers/notas-handler-factory';

const notasRouter = Router();

const notasHandle = makeNotasHandler();

notasRouter.post('/', notasHandle.handle.bind(notasHandle));

export default notasRouter;
