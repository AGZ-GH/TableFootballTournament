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

    /**
     * add a tournament to the database
     * @async
     * @param {CreateTournamentRequest} tournament tournament data to add
     * @returns {Tournament} the saved entity in the database
     */
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

    /**
     * fetch a tournament by a given ID
     * @async
     * @param {number} id id ofthe tournament
     * @throws {TournamentNotFoundError}
     * @returns {TournamentNoMatchesResponse} data of the tournament searched
     */
    public async getTournamentById(id: number): Promise<TournamentNoMatchesResponse> {
        const tournament = await this.tournamentRepository.findOneBy({ id: id });
        if (!tournament) {
            throw new TournamentNotFoundError(id);
        }

        return TournamentNoMatchesResponse.MapFromEntity(tournament);
    }

    /**
     * fetch a tournament with its matches by a given ID
     * @param {number} id id of the tournament
     * @returns {TournamentResponse} data of the tournament with matches included
     */
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

    /**
     * delete a tournament from the database
     * @async
     * @param id id of the tournament to delete
     */
    public async deleteTournamentById(id: number): Promise<void> {
        await this.tournamentRepository.delete(id);
    }

    /**
     * add a team to the tournament
     * @async
     * @param {number} tournamentId id of the tournament
     * @param {number} teamId id of the team to add
     * @throws {TournamentNotFoundError}
     * @throws {TeamNotFoundError}
     * @throws {TeamAlreadyInTournament}
     * @returns 
     */
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

    /**
     * generate a matches for a tournament
     * @async
     * @param {number} tournamentId id of the tournament to generate
     * @throws {TournamentNotFoundError}
     * @throws {TournamentAlreadyGenerated}
     */
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
    /**
     * fetch all the tournament without their relations
     * @async
     * @returns {TournamentNoMatchesResponse[]} list of all the tournaments
     */
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

    /**
     * generate the tree of matches for the tournament
     * @param tournament tournament for generate
     * @returns {Match[]} a list of matches generated for the tournament
     */
    private createMatchTree(tournament: Tournament): Match[] {
        let matches: Match[] = [];
        // generate tournament as a binary tree
        // given n nb of team
        const unassignedTeams = [...tournament.teams];
        const nbMatches = tournament.teams.length / 2

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

    /**
     * give a match to the the tournament players
     * @param {Match[]} matches list of the tournament matches
     * @param {Team[]} unassignedTeams remaining players signed int the tournament without a match
     */
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
    /**
     * give a match to the last player
     * @param {Match[]} matches list of the tournament matches
     * @param {Team[]} unassignedTeams remaining players signed int the tournament without a match
     */
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