import { TournamentResponse } from "../response/tournament/Tournament.reponse";
import { AppDataSource } from "../data-source";
import { Tournament } from "../entity/Tournament.entity";
import { CreateTournamentRequest } from "../request/tournament/CreateTournament.request";
import { Team } from "../entity/Team.entity";
import { Match } from "../entity/Match.entity";
import { TournamentNoMatchesResponse } from "../response/tournament/TournamentNoMatches.response";
import TournamentNotFoundError from "../error/tournament/TournamentNotFound.error";
import TeamNotFoundError from "../error/team/TeamNotFound.error";
import TeamAlreadyInTournament from "../error/tournament/TeamAlreadyInTournament.error";
import TournamentAlreadyGenerated from "../error/tournament/TournamentAlreadyGenerated.error";
import { TeamResponse } from "../response/team/Team.reponse";

export class TournamentService {

    private readonly tournamentRepository = AppDataSource.getRepository(Tournament);
    private readonly teamRepository = AppDataSource.getRepository(Team);

    public async createTournament(tournament: CreateTournamentRequest) {
        const tournamentEntity = new Tournament();
        tournamentEntity.name = tournament.name;
        tournamentEntity.description = tournament.description;
        tournamentEntity.startingDate = tournament.startDate;
        tournamentEntity.endDate = tournament.endDate;
        tournamentEntity.matches = [];
        tournamentEntity.teams = [];

        return await this.tournamentRepository.save(tournamentEntity);
    }
    public async getTournamentById(id: number): Promise<TournamentNoMatchesResponse> {
        const tournament = await this.tournamentRepository.findOneBy({ id: id });
        if (!tournament) {
            throw new TournamentNotFoundError(id);
        }

        return TournamentNoMatchesResponse.MapFromEntity(tournament);
    }

    public async getTournamentWithMatchesById(id: number): Promise<TournamentResponse> {
        //player in matches are eager !
        const tournament = await this.tournamentRepository
            .findOne({
                where: { id: id },
                relations: {
                    matches: true,
                    teams: true
                },
            });
        const tournamentResponse = new TournamentResponse();
        if (tournament == null) {
            tournamentResponse.id = -1;
            return tournamentResponse;
        }
        return TournamentResponse.MapFromEntity(tournament);
    }

    public async deleteTournamentById(id: number): Promise<void> {
        await this.tournamentRepository.delete(id);
    }

    public async addTeamToTournament(tournamentId: number, teamId: number) {
        const tournament = await this.tournamentRepository
            .findOne({ where: { id: tournamentId }, relations: ['teams'] });

        if (!tournament) {
            throw new TournamentNotFoundError(tournamentId);
        }

        const team = await this.teamRepository.findOneBy({ id: teamId })
        if (!team) {
            throw new TeamNotFoundError(teamId);
        }

        tournament.teams.forEach((team) => {
            if (teamId == team.id) {
                throw new TeamAlreadyInTournament(teamId, tournamentId);
            }
        })

        tournament.teams.push(team);
        this.tournamentRepository.save(tournament);
        return TeamResponse.MapFromEntity(team);
    }

    public async generateTournament(tournamentId: number) {
        const tournament = await this.tournamentRepository
            .findOne({
                where: { id: tournamentId }, relations: {
                    teams: true,
                    matches: true,
                }
            });

        if (!tournament) {
            throw new TournamentNotFoundError(tournamentId);
        }

        if (tournament?.matches.length > 0) {
            throw new TournamentAlreadyGenerated(tournamentId);
        }

        const matchesToSave = this.createMatchTree(tournament);

        AppDataSource.manager.save(matchesToSave);
    }

    public async getAllTournaments(): Promise<TournamentNoMatchesResponse[]> {
        const tournaments = await this.tournamentRepository.find({
            select: {
                id: true,
                name: true,
                description: true,
                startingDate: true,
                endDate: true,
                teams: true,
            },
            relations: {
                teams: true,
            }
        });

        return tournaments.map(t => TournamentNoMatchesResponse.MapFromEntity(t));
    }

    private createMatchTree(tournament: Tournament): Match[] {
        let matches: Match[] = [];
        // generate tournament as a binary tree
        // given n nb of team
        const unassignedTeams = [...tournament.teams];
        const nbMatches = tournament.teams.length

        for (let i = 0; i <= nbMatches; i++) {
            // first node
            const match = new Match();
            match.date = tournament.startingDate;
            match.scoreTeam1 = 0;
            match.scoreTeam2 = 0;
            match.tournament = tournament;
            // search for a parent node
            for (let m of matches) {
                if (!m.leftMatch) {
                    match.nextMatch = m;
                    m.leftMatch = match;
                    break;
                }
                if (!m.rightMatch) {
                    match.nextMatch = m;
                    m.rightMatch = match
                    break;
                }
            }
            matches.push(match);
        }

        this.populatedFirstRound(matches, unassignedTeams);
        return matches;
    }

    private populatedFirstRound(matches: Match[], unassignedTeams: Team[]) {
        // populate first round with players
        // this could be improve by populating them while creating the matches
        // the height of the tree is sqrt(nbMatches)
        // therefor the first node at the bottom of the tree is
        // 2^(sqrt(nbMatches)-1) as this is a binary tree
        // that would save the cost of reiterating through all the nodes again
        // at the cost of a more complexe to understand code
        for (let m of matches) {
            // nodes at the bottom of the tree, therefor first round
            if (!m.leftMatch && !m.rightMatch) {
                m.team1 = unassignedTeams.length != 0 ? unassignedTeams.pop() : undefined;
                m.team2 = unassignedTeams.length != 0 ? unassignedTeams.pop() : undefined;
            }
        }
        this.handleUnevenParticipants(matches, unassignedTeams);
    }

    private handleUnevenParticipants(matches: Match[], unassignedTeams: Team[]) {
        //for uneven number of teams
        //there should be a team unassigned
        if (unassignedTeams.length != 0) {
            for (let m of matches) {
                // we qualify the player for round 2 immediatly
                // the next match being the one unbalanced
                if (m.leftMatch && !m.rightMatch) {
                    m.team1 = unassignedTeams.length != 0 ? unassignedTeams.pop() : undefined;
                    break;
                }
            }
        }
    }
}   