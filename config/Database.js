import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

/*Підключення до бази даних яка хоcтиться на Amazon*/
const db = new Sequelize(process.env.DATABASE, process.env.USERDB, process.env.PASS, {
    host: process.env.HOST,
    dialect: "mysql"
});

export default db;


