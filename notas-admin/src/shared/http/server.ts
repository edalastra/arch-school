import env from '../env';
import app from '../../config/app';

app.listen(env.PORT, () => console.log('Server running on ' + env.PORT));
