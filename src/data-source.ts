import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "./entities/post";

require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Post],
  migrations: [],
  subscribers: [],
  timezone: "Z",
});
