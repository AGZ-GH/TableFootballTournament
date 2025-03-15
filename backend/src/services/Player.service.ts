import { Equal } from "typeorm";
import { AppDataSource } from "../data-source";
import { Player } from "../entity/Player.entity";
import { CreatePlayerRequest } from "../request/player/CreatePlayer.request";
import { LoginPlayerRequest } from "../request/player/LoginPlayer.request";
import { UpdatePlayerRequest } from "../request/player/UpdatePlayer.request";
import { PlayerResponse } from "../response/player/Player.response";
import { LoggedPlayerResponse } from "../response/player/LoggedPlayerResponse";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export class PlayerService {
    async createPlayer(player: CreatePlayerRequest) {
        const newPlayer = new Player();
        newPlayer.firstname = player.firstname;
        newPlayer.lastname = player.lastname;
        const salt = bcrypt.genSaltSync(10);
        newPlayer.password = await bcrypt.hashSync(player.password, salt);
        newPlayer.isAdmin = false;

        await AppDataSource.getRepository(Player).save(newPlayer);
    }

    async UpdatePlayer(id: number, player: UpdatePlayerRequest) {
        const updatedPlayer = new Player();
        updatedPlayer.id = id
        updatedPlayer.firstname = player.firstName;
        updatedPlayer.lastname = player.lastName;

        return await AppDataSource.getRepository(Player).update(updatedPlayer.id, updatedPlayer);
    }

    async getPlayerById(id: number): Promise<PlayerResponse> {
        const playerEntity = await AppDataSource.getRepository(Player).findOneBy({ id: id });
        const player = new PlayerResponse();
        if (!playerEntity) {
            player.id = -1;
            return player;
        }

        player.id = playerEntity.id;
        player.firstname = playerEntity.firstname;
        player.lastname = playerEntity.lastname;

        return player;
    }

    async loginPlayer(playerLogging: LoginPlayerRequest): Promise<LoggedPlayerResponse> {
        const player = await AppDataSource
            .getRepository(Player)
            .findOne({ where: { lastname: Equal(playerLogging.lastname) } })

        if (!player || player.id < 1) {
            throw new Error("User not found");
        }
        const passwordMatch = await bcrypt.compareSync(playerLogging.password, player.password);
        if (!passwordMatch) {
            throw new Error("Invalid password");
        }   

        const response = new LoggedPlayerResponse();
        response.id = player.id;
        response.token = jwt.sign({ userId  : player.id, isAdmin: player.isAdmin}, process.env.JWT_SECRET, { expiresIn: '1h' });
        return response;
    }   

    async deletePlayerById(id: number) {
        return await AppDataSource.getRepository(Player).delete(id);
    }

    isAdmin(token: string): boolean{
        return jwt.verify(token,process.env.JWT_SECRET).isAdmin;
    }
}   