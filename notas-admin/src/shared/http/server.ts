import env from '../env';
import { createApp } from '../../config/app';

const app = createApp();

app.listen(env.PORT, () => console.log('Server running on ' + env.PORT));
