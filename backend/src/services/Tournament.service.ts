import { TournamentResponse } from "../response/Tournament.reponse";
import { AppDataSource } from "../data-source";
import { Tournament } from "../entity/Tournament.entity";

export class TournamentService{
    async createTournament(tournament: TournamentResponse){
        const tournamentEntity = new Tournament();
        tournamentEntity.name = tournament.name;
        tournamentEntity.description = tournament.description;
        tournamentEntity.startingDate = tournament.startingDate;
        tournamentEntity.endDate = tournament.endDate;

        return await AppDataSource.getRepository(Tournament).save(tournamentEntity);
    }
    async getTournamentById(id: number) : Promise<TournamentResponse>{
        return await AppDataSource.manager.getId(id);
    }
    async deleteTournamentById(id: number) : Promise<void>{
        await AppDataSource.getRepository(Tournament).delete(id);
    }   
}   