import { Router } from 'express';
import { makeCreateHandler } from 'src/modules/notas/factories/handlers';

const notasRouter = Router();

const notasHandle = makeCreateHandler();

notasRouter.post('/', notasHandle.handle.bind(notasHandle));

export default notasRouter;
