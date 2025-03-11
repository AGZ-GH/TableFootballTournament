import { AppDataSource } from "../data-source";
import { Player } from "../entity/Player.entity";
import { CreatePlayerRequest } from "../request/CreatePlayer.request";
import { UpdatePlayerRequest } from "../request/UpdatePlayer.request";
import { PlayerResponse } from "../response/Player.response";

export class PlayerService {
    async createPlayer(player: CreatePlayerRequest) {
        const newPlayer = new Player();
        newPlayer.firstName = player.firstName;
        newPlayer.lastName = player.lastName;
        newPlayer.password = player.password;
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

    async deletePlayerById(id: number) {
        return await AppDataSource.getRepository(Player).delete(id);
    }
}