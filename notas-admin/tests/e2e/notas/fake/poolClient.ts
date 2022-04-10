import { Pool } from 'pg';
import env from '../../../../src/shared/env';

export const client = new Pool({
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PWD,
  port: env.DB_PORT,
  max: 1,
  idleTimeoutMillis: 0,
});
