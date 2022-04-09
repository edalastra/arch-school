import { Router } from 'express';
import notasRouter from 'src/modules/notas/infra/http/routes/notas.routes';

const router = Router();

router.use('/notas', notasRouter);

export default router;
