import { AppDataSource } from "../data-source";
import { Match } from "../entity/Match.entity";
import { Team } from "../entity/Team.entity";
import { Tournament } from "../entity/Tournament.entity";
import { CreateMatchRequest } from "../request/match/CreateMatch.request";
import { UpdateMatchRequest } from "../request/match/UpdateMatch.request";
import { MatchResponse } from "../response/match/Match.response";

export class MatchService {
    async createMatch(match: CreateMatchRequest) {
        const newMatch = new Match();
        newMatch.date = match.date;
        newMatch.scoreTeam1 = 0;
        newMatch.scoreTeam2 = 0;

        const team1 = new Team();
        const team2 = new Team();
        team1.id = match.team1Id;
        team2.id = match.team2Id;
        newMatch.team1 = team1
        newMatch.team2 = team2

        const tournament = new Tournament();
        tournament.id = match.tournamentId;

        await AppDataSource.getRepository(Match).save(newMatch);
    }

    async updateMatch(id: number, match: UpdateMatchRequest) {
        const updatedMatch = new Match();
        updatedMatch.id = id;
        updatedMatch.date = match.date;
        updatedMatch.scoreTeam1 = 0;
        updatedMatch.scoreTeam2 = 0;

        const team1 = new Team();
        const team2 = new Team();
        team1.id = match.team1Id;
        team2.id = match.team2Id;
        updatedMatch.team1 = team1
        updatedMatch.team2 = team2

        const tournament = new Tournament();
        tournament.id = match.tournamentId;

        await AppDataSource.getRepository(Match).save(updatedMatch);
    }

    async getMatchById(id: number) : Promise<MatchResponse> {
        await AppDataSource.getRepository(Match).findOneBy({ id: id });
        const match = new MatchResponse();
        match.
    }

    async deleteMatch(id: number) {
        return await AppDataSource.getRepository(Match).delete(id);
    }
}