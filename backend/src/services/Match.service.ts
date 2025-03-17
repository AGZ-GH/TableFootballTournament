import { AppDataSource } from "../data-source";
import { Match } from "../entity/Match.entity";
import { Team } from "../entity/Team.entity";
import { Tournament } from "../entity/Tournament.entity";
import MatchNotFoundError from "../error/match/MatchNotFound.error";
import { CreateMatchRequest } from "../request/match/CreateMatch.request";
import { UpdateMatchRequest } from "../request/match/UpdateMatch.request";
import { MatchResponse } from "../response/match/Match.response";

export class MatchService {
    private readonly matchRepository = AppDataSource.getRepository(Match);

    public async createMatch(match: CreateMatchRequest) {
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

        await this.matchRepository.save(newMatch);
    }

    public async updateMatch(id: number, match: UpdateMatchRequest) {
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

        await this.matchRepository.save(updatedMatch);
    }

    public async getMatchById(id: number): Promise<MatchResponse> {
        const match = await this.matchRepository.findOneBy({ id: id });
        const matchResponse = new MatchResponse();
        if (!match) {
            throw new MatchNotFoundError(id);
        }
        matchResponse.id = match.id;
        matchResponse.date = match.date;
        matchResponse.scoreTeam1 = match.scoreTeam1;
        matchResponse.scoreTeam2 = match.scoreTeam2;
        matchResponse.team1 = match.team1;
        matchResponse.team2 = match.team2;

        return matchResponse;
    }

    public async deleteMatch(id: number) {
        return await this.matchRepository.delete(id);
    }

    public async findAll(): Promise<MatchResponse[]> {
        const matches = await this.matchRepository.find({
            select: {
                id: true,
                date: true,
                scoreTeam1: true,
                scoreTeam2: true
            },
            relations: {
                team1: true,
                team2: true
            }
        });
        return matches.map(m => MatchResponse.MapFromEntity(m));
    }

    public async findTournamentMatches(id: number): Promise<MatchResponse[]> {
        const matches = await this.matchRepository
            .createQueryBuilder("match")
            .leftJoinAndSelect("match.team1", "team1")
            .leftJoinAndSelect("match.team2", "team2")
            .where("tournamentId = :id", { id })
            .getMany();
        return matches.map(m => MatchResponse.MapFromEntity(m));
    }
}