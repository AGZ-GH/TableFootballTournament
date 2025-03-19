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

    public async createTeam(team: CreateTeamRequest) {
        const newTeam = new Team();

        const p1 = new Player();
        p1.id = team.player1Id;

        newTeam.name = team.name;
        newTeam.player1 = p1;

        if (team.player2Id) {
            const p2 = new Player();
            p2.id = team.player2Id;
            newTeam.player2 = p2;
        }

        await this.teamRepository.save(newTeam);
    }

    public async updateTeamById(id: number, team: UpdateTeamRequest) {
        const updatedTeam = new Team();
        updatedTeam.id = id
        const p1 = new Player();
        p1.id = team.player1Id;
        const p2 = new Player();
        p2.id = team.player2Id;

        updatedTeam.player1 = p1;
        updatedTeam.player2 = p2;

        return await this.playerRepository.update(updatedTeam.id, updatedTeam);
    }

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

    public async deleteTeamById(id: number) {
        return await this.teamRepository.delete(id);
    }


}       