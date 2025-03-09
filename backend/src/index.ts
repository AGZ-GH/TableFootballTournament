import "reflect-metadata"
import { DataSource } from "typeorm"
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Match } from "./entity/Match";
import { Player } from "./entity/Player";
import { Team } from "./entity/Team";
import { Tournament } from "./entity/Tournament";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "tableFootballTournament",
  entities: [Match,Player,Team,Tournament],
  synchronize: true,
  logging: false,
})
  
const app: Express = express();
const port = process.env.PORT ?? 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});