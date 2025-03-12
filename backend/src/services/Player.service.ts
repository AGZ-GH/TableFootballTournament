import { AppDataSource } from "../data-source";
import { Player } from "../entity/Player.entity";
import { CreatePlayerRequest } from "../request/player/CreatePlayer.request";
import { LoginPlayerRequest } from "../request/player/LoginPlayer.request";
import { UpdatePlayerRequest } from "../request/player/UpdatePlayer.request";
import { PlayerResponse } from "../response/player/Player.response";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export class PlayerService {
    async createPlayer(player: CreatePlayerRequest) {
        const newPlayer = new Player();
        newPlayer.firstName = player.firstName;
        newPlayer.lastName = player.lastName;
        const salt = bcrypt.genSaltSync(10);
        newPlayer.password = await bcrypt.hashSync(player.password,salt);
        newPlayer.isAdmin = false;

        await AppDataSource.getRepository(Player).save(newPlayer);
    }

    async UpdatePlayer(id: number, player: UpdatePlayerRequest) {
        const updatedPlayer = new Player();
        updatedPlayer.id = id
        updatedPlayer.firstName = player.firstName;
        updatedPlayer.lastName = player.lastName;

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
        player.firstName = playerEntity.firstName;
        player.lastName = playerEntity.lastName;

        return player;
    }

    async loginPlayer(playerLogging: LoginPlayerRequest): Promise<string> {
        const player = await AppDataSource.getRepository(Player).findOneBy({ lastName: playerLogging.lastname });
        if (!player || player.id < 1) {
            throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compareSync(playerLogging.password, player.password);
        if (!passwordMatch) {
            throw new Error("Invalid password");
        }

        return jwt.sign({ player }, "JWT_SECRET", { expiresIn: '1h' });
    }           

    async deletePlayerById(id: number) {
        return await AppDataSource.getRepository(Player).delete(id);
    }
}