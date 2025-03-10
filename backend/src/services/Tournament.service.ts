import { TournamentResponse } from "../response/Tournament.reponse";
import { AppDataSource } from "../data-source";
import { Tournament } from "../entity/Tournament.entity";

export class TournamentService{
    getTournamentById(id: number) : TournamentResponse{
        return AppDataSource.manager.getId(id);
    }
    async deleteTournamentById(id: number) : Promise<void>{
        await AppDataSource.createQueryBuilder()
        .delete()
        .from(Tournament)
        .where("id = :id", { id: 1 })
        .execute();
    }
}