import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const stringConnection = `${process.env.DB}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
// const sequelize = new Sequelize(stringConnection);
const sequelize = new Sequelize(
  process.env.DB_NAME || "postgres",
  process.env.DB_USER || "user",
  process.env.DB_PASSWORD || "password",
  {
    // @ts-ignore
    dialect: process.env.DB!,
    host: process.env.DB_HOST,
    port: parseInt(`${process.env.DB_PORT}`),
    logging: false,
  }
);

export default sequelize;
