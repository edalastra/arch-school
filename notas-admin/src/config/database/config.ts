import { Pool } from 'pg';
import env from '../../shared/env';

export const client = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PWD,
  port: env.DB_PORT as number,
  max: 10,
  idleTimeoutMillis: 1000,
});
