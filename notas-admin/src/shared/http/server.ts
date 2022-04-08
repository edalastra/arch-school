import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import env from '../env';
import { errorMiddleware } from './middlewares';

const app = express();

app.use(cors);
app.use(errorMiddleware);

app.listen(env.PORT, () => console.log('Server running on ' + env.PORT));
