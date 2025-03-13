import { TournamentResponse } from "../response/Tournament.reponse";
import { AppDataSource } from "../data-source";
import { Tournament } from "../entity/Tournament.entity";
import { CreateTournamentRequest } from "../request/tournament/CreateTournament.request";

export class TournamentService {
    async createTournament(tournament: CreateTournamentRequest) {
        const tournamentEntity = new Tournament();
        tournamentEntity.name = tournament.name;
        tournamentEntity.description = tournament.description;
        tournamentEntity.startingDate = tournament.startingDate;
        tournamentEntity.endDate = tournament.endDate;

        return await AppDataSource.getRepository(Tournament).save(tournamentEntity);
    }
    async getTournamentById(id: number): Promise<TournamentResponse> {
        const tournament = await AppDataSource.getRepository(Tournament).findOneBy({ id: id });
        const tournamentResponse = new TournamentResponse();
        if (tournament == null) {
            tournamentResponse.id = -1;
            return tournamentResponse;
        }
        tournamentResponse.id = tournament.id ?? -1;
        tournamentResponse.name = tournament.name;
        tournamentResponse.description = tournament.description;
        tournamentResponse.startingDate = tournament.startingDate;
        tournamentResponse.endDate = tournament.endDate;

        return tournamentResponse;
    }
    async deleteTournamentById(id: number): Promise<void> {
        await AppDataSource.getRepository(Tournament).delete(id);
    }
}   