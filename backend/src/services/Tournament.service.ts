import { TournamentResponse } from "../response/Tournament.reponse";
import { AppDataSource } from "../data-source";
import { Tournament } from "../entity/Tournament.entity";
import { CreateTournamentRequest } from "../request/tournament/CreateTournament.request";
import { Team } from "../entity/Team.entity";
import { Match } from "../entity/Match.entity";

export class TournamentService {

    async createTournament(tournament: CreateTournamentRequest) {
        const tournamentEntity = new Tournament();
        tournamentEntity.name = tournament.name;
        tournamentEntity.description = tournament.description;
        tournamentEntity.startingDate = tournament.startDate;
        tournamentEntity.endDate = tournament.endDate;
        tournamentEntity.matches = [];
        tournamentEntity.teams = [];

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

    async addTeamToTournament(tournamentId: number, teamId: number) {
        const tournament = await AppDataSource
            .getRepository(Tournament)
            .find({ where: { id: tournamentId }, relations: ['teams'] });

        if (!tournament || tournament.length == 0) {
            throw Error("Tournament not found");
        }

        const team = await AppDataSource.getRepository(Team).findOneBy({ id: teamId })
        if (!team) {
            throw Error("Team not found");
        }

        tournament[0].teams.push(team);
        AppDataSource.manager.save(tournament);
    }

    async generateTournament(tournamentId: number) {
        const tournament = await AppDataSource
            .getRepository(Tournament)
            .findOne({ where: { id: tournamentId }, relations: {
                teams: true,
                matches: true,
            } });

        if (!tournament) {
            throw new Error("Tournament not found");
        }

        if(tournament?.matches.length > 0){
            throw new Error("Tournament already generated");
        }

        if (tournament.teams.length % 2 != 0) {
            throw new Error("Uneven number of participant");
        }

        for (let i = 0; i <= tournament.teams.length / 2; i = i + 2) {
            const match = new Match();
            match.date = tournament.startingDate;
            match.scoreTeam1 = 0;
            match.scoreTeam2 = 0;
            match.team1 = tournament.teams[i];
            match.team2 = tournament.teams[i + 1];
            match.tournament = tournament;
            AppDataSource.manager.save(match);
        }
    }

    async getAllTournaments(): Promise<TournamentResponse[]> {
        const tournaments = await AppDataSource.getRepository(Tournament).find({
            select: {
                id: true,
                name: true,
                description: true,
                startingDate: true,
                endDate: true,
            }
        });
        const tournamentResponse: TournamentResponse[] = tournaments.map(t => ({
            id: t.id,
            name: t.name,
            description: t.description,
            startingDate: t.startingDate,
            endDate: t.endDate,
        }))
        return tournamentResponse;
    }
}   