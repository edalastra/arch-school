import { Client } from 'pg';
import env from '../../shared/env';

export const client = new Client({
  user: env.DB_USER,
  host: env.DB_USER,
  database: env.DB_NAME,
  password: env.DB_PWD,
  port: env.DB_PORT as number,
});
