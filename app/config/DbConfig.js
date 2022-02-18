import dotenv from 'dotenv'
dotenv.config()
export const HOST = process.env.POSTGRES_HOST;
export const USER = process.env.POSTGRES_USER;
export const PASSWORD = process.env.POSTGRES_PASSWORD;
export const DB = process.env.POSTGRES_DB;
export const dialect = "postgres";
export const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
};
