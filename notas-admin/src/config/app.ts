import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import { json } from 'body-parser';
import 'express-async-errors';
import { errorMiddleware } from '../shared/http/middlewares';
import router from '../shared/http/routes';

const app = express();

app.use(json());
app.use(cors());
app.use('/v1', router);
app.use(errors());
app.use(errorMiddleware);

export default app;
