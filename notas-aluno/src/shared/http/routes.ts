import { Router } from 'express';
import notasRouter from '../../modules/notas/infra/http/routes/notas.routes';

const router = Router();

router.use('/notas', notasRouter);

export default router;
