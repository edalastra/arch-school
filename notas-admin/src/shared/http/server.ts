import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { json } from 'body-parser';

import env from '../env';
import { errorMiddleware } from './middlewares';
import router from './routes';

const app = express();

app.use(json());
app.use(cors());

app.use('/v1', router);

app.use(errorMiddleware);

app.listen(env.PORT, () => console.log('Server running on ' + env.PORT));
