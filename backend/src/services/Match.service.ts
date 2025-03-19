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

        team1.id = match.team1Id;
        newMatch.team1 = team1

        const team2 = new Team();
        if (match.team2Id) {
            team2.id = match.team2Id;
            newMatch.team2 = team2
        }

        const tournament = new Tournament();
        tournament.id = match.tournamentId;

        await this.matchRepository.save(newMatch);
    }

    public async updateMatch(id: number, updateMatchData: UpdateMatchRequest) {
        const currentMatch = await this.getMatchById(id);
        const updatedMatch = new Match();

        updatedMatch.id = id;
        updatedMatch.date = updateMatchData.date ?? currentMatch.date;
        updatedMatch.scoreTeam1 = updateMatchData.scoreTeam1 ?? currentMatch.scoreTeam1;
        updatedMatch.scoreTeam2 = updatedMatch.scoreTeam2 ?? currentMatch.scoreTeam2;

        const team1 = new Team();
        team1.id = updateMatchData.team1Id ?? currentMatch.team1.id ?? undefined;
        updatedMatch.team1 = team1;

        const team2 = new Team();
        if (updateMatchData.team2Id) {
            team2.id = updateMatchData.team2Id ?? currentMatch.team2.id ?? undefined;
            updatedMatch.team2 = team2;
        }

        updatedMatch.closed = updateMatchData.closed ?? currentMatch.closed
        await this.matchRepository.save(updatedMatch);
    }

    public async getMatchById(id: number): Promise<MatchResponse> {
        const match = await this.matchRepository.findOneBy({ id: id });
        if (!match) {
            throw new MatchNotFoundError(id);
        }
        return MatchResponse.MapFromEntity(match);
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