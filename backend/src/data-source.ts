import "reflect-metadata"
import { DataSource } from "typeorm"

import { Match } from "./entity/Match.entity";
import { Player } from "./entity/Player.entity";
import { Team } from "./entity/Team.entity";
import { Tournament } from "./entity/Tournament.entity";

const databaseName = process.env.DATABASENAME ?? "";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: databaseName,
    entities: [Player,Team,Match,Tournament],
    synchronize: true ,
    logging: false, 
})