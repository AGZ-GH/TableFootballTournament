import { AppDataSource } from "../data-source";
import { Match } from "../entity/Match.entity";
import { Team } from "../entity/Team.entity";
import { Tournament } from "../entity/Tournament.entity";
import MatchNotFoundError from "../error/match/MatchNotFound.error";
import { CreateMatchRequest } from "../request/match/CreateMatch.request";
import { UpdateMatchRequest } from "../request/match/UpdateMatch.request";
import { MatchResponse } from "../response/match/Match.response";
import MatchClosedError from "../error/match/MatchClosed.error";
import MatchEqualityError from "../error/match/MatchEquality.error";
import NoTeamForClosingMatchError from "../error/match/NoTeamForClosingMatch.error";

export class MatchService {
    private readonly matchRepository = AppDataSource.getRepository(Match);

    /**
     * persiste a Match on the database
     * @param {CreateMatchRequest} match Match data to be saved
     */
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

    /**
     * perform an update on the database
     * @async
     * @param {number} id id of the match to update
     * @param {UpdateMatchRequest} updateMatchData data to update the match
     * @throws {MatchNotFoundError}
     * @throws {MatchClosedError}
     */
    public async updateMatch(id: number, updateMatchData: UpdateMatchRequest) {
        const currentMatch = await this.matchRepository.findOne({
            where: { id: id },
            relations: { nextMatch: true }
        });
        if (!currentMatch) {
            throw new MatchNotFoundError(id);
        }
        if (currentMatch.closed) {
            throw new MatchClosedError(id);
        }
        const updatedMatch = this.updateMatchData(updateMatchData, currentMatch);

        if (updateMatchData.closed) {
            await this.closeMatch(
                currentMatch,
                updateMatchData.scoreTeam1,
                updateMatchData.scoreTeam2
            );
        }

        await this.matchRepository.save(updatedMatch);
    }

    /**
     * close a match
     * @async
     * @param {Match} currentMatch match to be closed
     * @param {number} scoreTeam1 score of the 1st team
     * @param {number} scoreTeam2 score of the 2nd team
     * @throws {MatchEqualityError}
     * @throws {NoTeamForClosingMatchError}
     */
    private async closeMatch(currentMatch: Match, scoreTeam1: number, scoreTeam2: number) {
        const nextMatch = await this.matchRepository.findOneBy({ id: currentMatch.nextMatch.id });
        if (!nextMatch) {
            return;
        }
        // can't close a match on an equality
        if (scoreTeam1 == scoreTeam2) {
            throw new MatchEqualityError(currentMatch.id);
        }
        // can't close a match that doesn't have 2 team
        // qualified for it
        if (!currentMatch.team1 || !currentMatch.team2) {
            throw new NoTeamForClosingMatchError(currentMatch.id);
        }

        if (scoreTeam1 > scoreTeam2) {
            this.addTeamToMatch(nextMatch, currentMatch.team1);
        }
        else {
            this.addTeamToMatch(nextMatch, currentMatch.team2);
        }

        await this.matchRepository.save(nextMatch);
    }

    /**
     * Add a team to a match
     * @param {Match} match match to which you want to add the team
     * @param {Team} team team to be added
     */
    private addTeamToMatch(match: Match, team: Team) {
        if (!match.team1) {
            match.team1 = team;
        }
        else {
            match.team2 = team;
        }
    }

    /**
     * prepare a Match entity updated from a current Match updated with the given data
     * @param {UpdateMatchRequest} updateMatchData data to be updated in the match
     * @param {Match} currentMatch match before the update
     * @returns the updated match
     */
    private updateMatchData(updateMatchData: UpdateMatchRequest, currentMatch: Match): Match {
        const updatedMatch = new Match();

        updatedMatch.id = currentMatch.id;
        updatedMatch.date = updateMatchData.date ?? currentMatch.date;
        updatedMatch.scoreTeam1 = updateMatchData.scoreTeam1 ?? currentMatch.scoreTeam1;
        updatedMatch.scoreTeam2 = updatedMatch.scoreTeam2 ?? currentMatch.scoreTeam2;

        const team1 = new Team();
        if (updateMatchData.team1Id) {
            team1.id = updateMatchData.team1Id
            updatedMatch.team1 = team1;

        }
        else if (currentMatch.team1) {
            team1.id = currentMatch.team1.id ?? undefined;
        }

        const team2 = new Team();
        if (updateMatchData.team2Id) {
            team2.id = updateMatchData.team2Id
            updatedMatch.team1 = team2;

        }
        else if (currentMatch.team2) {
            team2.id = currentMatch.team2.id ?? undefined;
        }

        updatedMatch.closed = updateMatchData.closed ?? currentMatch.closed

        return updatedMatch;
    }

    /**
     * find a match by its ID
     * @async
     * @param {number} id id of the match
     * @throws {MatchNotFoundError}
     * @returns {MatchResponse} the match for the given ID
     */
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

    /**
     * find all the matches
     * @async
     * @returns {MatchResponse[]}
     */
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

    /**
     * find the matches of a tournament
     * @async
     * @param {number} id id of the tournament
     * @returns {MatchResponse[]}
     */
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