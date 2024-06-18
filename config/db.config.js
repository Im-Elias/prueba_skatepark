import pg from "pg";
const { Pool } = pg;

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const config = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  allowExitOnIdle: true,
};

export const pool = new Pool(config);
