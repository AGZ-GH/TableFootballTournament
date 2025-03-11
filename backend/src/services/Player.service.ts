import { AppDataSource } from "../data-source";
import { Player } from "../entity/Player.entity";
import { CreatePlayerRequest } from "../request/CreatePlayer.request";
import { UpdatePlayerRequest } from "../request/UpdatePlayer.request";
    
export class PlayerService{
    async createPlayer(player : CreatePlayerRequest){
        const newPlayer = new Player();
        newPlayer.firstName = player.firstName;
        newPlayer.lastName = player.lastName;
        newPlayer.password = player.password
        await AppDataSource.getRepository(Player).save(newPlayer);
    }
    async UpdatePlayer(player: UpdatePlayerRequest){
        const updatedPlayer = new Player();
        updatedPlayer.id = player.id
        updatedPlayer.firstName = player.firstName;
        updatedPlayer.lastName = player.lastName;

        return await AppDataSource.getRepository(Player).update(updatedPlayer.id, updatedPlayer);

    }

    async getPlayerById(id: number){
        return AppDataSource.getRepository(Player).findOneBy({id: id});
    }

    async deletePlayerById(id: number){
        return AppDataSource.getRepository(Player).delete(id);
    }
}