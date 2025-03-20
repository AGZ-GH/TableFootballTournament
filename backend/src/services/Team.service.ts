import { In, Not } from "typeorm";
import { AppDataSource } from "../data-source";
import { Player } from "../entity/Player.entity";
import { Team } from "../entity/Team.entity";
import PlayerTeamNotFound from "../error/team/PlayerTeamNotFound.error";
import TeamNotFoundError from "../error/team/TeamNotFound.error";
import { CreateTeamRequest } from "../request/team/CreateTeam.request";
import { FilterTeamByIdRequest } from "../request/team/FilterTeamById.request";
import { UpdateTeamRequest } from "../request/team/UpdateTeam.request";
import { TeamResponse } from "../response/team/Team.reponse";
import { TeamListResponse } from "../response/team/TeamList.response";
import { PlayerService } from "./Player.service";

const playerService = new PlayerService();

export class TeamService {
    private readonly teamRepository = AppDataSource.getRepository(Team);
    private readonly playerRepository = AppDataSource.getRepository(Player);
    
    /**
     * persiste a team on the database
     * @async
     * @param {CreateTeamRequest} team team to be created
     */
    public async createTeam(team: CreateTeamRequest) {
        const newTeam = new Team();

        const p1 = new Player();
        p1.id = team.player1Id;

        newTeam.name = team.name;
        newTeam.player1 = p1;

        const p2 = new Player();
        if (team.player2Id) {
            p2.id = team.player2Id;
            newTeam.player2 = p2;
        }

        await this.teamRepository.save(newTeam);
    }
    /**
     * update a team on the database
     * @async
     * @param {number} id id of the team to update
     * @param {UpdateTeamRequest} team data to update the team
     * @returns the updated team
     */
    public async updateTeamById(id: number, team: UpdateTeamRequest) {
        const updatedTeam = new Team();
        updatedTeam.id = id
        const p1 = new Player();
        p1.id = team.player1Id;

        const p2 = new Player();
        if (team.player2Id) {
            p2.id = team.player2Id;
            updatedTeam.player2 = p2;
        }

        updatedTeam.player1 = p1;

        return await this.playerRepository.update(updatedTeam.id, updatedTeam);
    }

    /**
     * fetch a team of the given ID 
     * @async
     * @param {number} teamId id of the wanted team
     * @returns 
     * @throws {TeamNotFoundError}
     */
    public async getTeamById(teamId: number): Promise<TeamResponse> {
        const teamEntity = await this.teamRepository
            .findOne({
                where: {
                    id: teamId
                },
                relations: {
                    player1: true,
                    player2: true,
                }
            });

        if (!teamEntity) {
            throw new TeamNotFoundError(teamId);
        }
        return TeamResponse.MapFromEntity(teamEntity);
    }

    /**
     * get the team of the given player
     * @async
     * @param playerId ID of the player
     * @returns {TeamResponse} the team of the player
     */
    public async getTeamByPlayerId(playerId: number): Promise<TeamResponse> {
        const teamEntity = await this.teamRepository
            .createQueryBuilder('team')
            .leftJoinAndSelect("team.player1", "player1")
            .leftJoinAndSelect("team.player2", "player2")
            .where('p1_FK = :playerId OR p2_FK = :playerId', { playerId })
            .getOne();

        if (!teamEntity) {
            throw new PlayerTeamNotFound(playerId);
        }
        return TeamResponse.MapFromEntity(teamEntity);
    }

    /**
     * get teams that don't have their ID in the given array of IDs
     * @async
     * @param {FilterTeamByIdRequest} req 
     * @returns {TeamListResponse[]} list of teams with just their IDs and names
     */
    public async filterTeamsByIds(req: FilterTeamByIdRequest): Promise<TeamListResponse[]> {
        const ids = req.teamIds ?? [];
        const teamEntities = await this.teamRepository
            .find({
                select: {
                    id: true,
                    name: true
                },
                where: {
                    id: Not(In(ids))
                }
            });
        return teamEntities.map(t => TeamListResponse.MapFromEntity(t));
    }

    /**
     * retrieve all the teams from the database
     * @async
     * @returns list of all the teams in the database
     */
    public async getAllTeams(): Promise<TeamResponse[]> {
        const tournaments = await this.teamRepository.find({
            select: {
                id: true,
                name: true,
            },
            relations: {
                player1: true,
                player2: true,
            }
        });
        const teamResponse: TeamResponse[] = tournaments.map(t => (TeamResponse.MapFromEntity(t)));
        return teamResponse;
    }

    /**
     * retrieve all the teams with only name and ids
     * @async
     * @returns {TeamListResponse[]}
     */
    public async getAllTeamsIdAndName(): Promise<TeamListResponse[]> {
        const team = await this.teamRepository.find({
            select: {
                id: true,
                name: true,
            },
        });
        const teamResponse = team.map(t => TeamListResponse.MapFromEntity(t))
        return teamResponse;
    }

    /**
     * delete a team by a given ID
     * @async
     * @param {number} id id of the team to delete 
     * @returns delete results
     */
    public async deleteTeamById(id: number) {
        return await this.teamRepository.delete(id);
    }


}       