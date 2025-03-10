import "reflect-metadata"
import dotenv from "dotenv";
import { DataSource } from "typeorm"
import { Match } from "./entity/Match.entity";
import { Player } from "./entity/Player.entity";
import { Team } from "./entity/Team.entity";
import { Tournament } from "./entity/Tournament.entity";

dotenv.config();

const databaseName = process.env.DATABASE_NAME ?? "";
const databasePort = process.env.DATABASE_PORT ?? 3306;
const databaseHost = process.env.DATABASE_HOST ?? "";
const databaseUsername = process.env.DATABASE_USERNAME ?? "lala";
const databasePwd = process.env.DATABASE_PWD ?? ""
export const AppDataSource = new DataSource({
    type: "mysql",
    host: databaseHost,
    database: databaseName,
    entities: [Player,Team,Match,Tournament],
    username: databaseUsername,   
    password: databasePwd,
    synchronize: true,
    })