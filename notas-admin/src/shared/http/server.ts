import express from 'express';
import env from '../env';

const app = express();

app.listen(env.PORT, () => 'Server running on ' + env.PORT);
