const PORT = process.env.PORT || 3333;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT as string) || 15432;
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PWD = process.env.DB_PWD || 'postgres';
const DB_NAME = process.env.DB_NAME || 'arch-school-dev';

export default {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PWD,
  DB_NAME,
};