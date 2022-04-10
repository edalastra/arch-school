import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import { json } from 'body-parser';
import 'express-async-errors';
import env from '../env';
import { errorMiddleware } from './middlewares';
import router from './routes';

const app = express();

app.use(json());
app.use(cors());
app.use('/v1', router);
app.use(errors());
app.use(errorMiddleware);

app.listen(env.PORT, () => console.log('Server running on ' + env.PORT));

export default app;
