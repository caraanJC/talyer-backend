import dotenv from 'dotenv';

dotenv.config();

export const PORT = Number(process.env.PORT || '3001');
export const SESSION_SECRET = process.env.SESSION_SECRET || 'chibi';
export const PG_HOST = process.env.PG_HOST || 'localhost';
export const PG_DATABASE = process.env.PG_DATABASE || 'talyer';
export const PG_USER = process.env.PG_USER || 'postgress';
export const PG_PASSWORD = process.env.PG_PASSWORD || 'password';
export const PG_PORT = Number(process.env.PG_PORT || 5432);
