import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import { json } from 'body-parser';
import 'express-async-errors';
import { errorMiddleware } from '../shared/http/middlewares';
import router from '../shared/http/routes';
import { swaggerUi, swaggerDocument } from './swagger';

export function createApp() {
  const app = express();

  app.use(json());
  app.use(cors());
  app.use('/v1', router);
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(errors());
  app.use(errorMiddleware);

  return app;
}
