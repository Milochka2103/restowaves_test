import { Sequelize } from 'sequelize';
import 'dotenv/config';

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
} = process.env;

const DB_URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?ssl=true`;

export const sequelize = new Sequelize(DB_URL);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });