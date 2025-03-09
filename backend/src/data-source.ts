import "reflect-metadata"
import { DataSource } from "typeorm"

import { Match } from "./entity/Match";
import { Player } from "./entity/Player";
import { Team } from "./entity/Team";
import { Tournament } from "./entity/Tournament";

const databaseName = process.env.DATABASENAME ?? "";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: databaseName,
    entities: [Match,Player,Team,Tournament],
    synchronize: true,
    logging: false,
    migrations: [],
    subscribers: [],
})