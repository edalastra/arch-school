import { Router } from 'express';
import { makeFindAllNotaHandler } from '../../../factories/handlers';

const notasRouter = Router();

const findAllNotaHandler = makeFindAllNotaHandler();

notasRouter.get('/', findAllNotaHandler.handle.bind(findAllNotaHandler));

export default notasRouter;
