import { AppDataSource } from "../data-source";
import { Player } from "../entity/Player.entity";
import { Team } from "../entity/Team.entity";
import { CreateTeamRequest } from "../request/team/CreateTeam.request";
import { UpdateTeamRequest } from "../request/team/UpdateTeam.request";
import { TeamResponse } from "../response/team/Team.reponse";
import { TeamListResponse } from "../response/team/TeamList.response";
import { PlayerService } from "./Player.service";

const playerService = new PlayerService();

export class TeamService {
    public async createTeam(team: CreateTeamRequest) {
        const newTeam = new Team();

        const p1 = new Player();
        p1.id = team.player1Id;
        const p2 = new Player();
        p2.id = team.player2Id;

        newTeam.name = team.name;
        newTeam.player1 = p1;
        newTeam.player2 = p2;
        await AppDataSource.getRepository(Team).save(newTeam);
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

        return await AppDataSource.getRepository(Player).update(updatedTeam.id, updatedTeam);
    }

    public async getTeamById(teamId: number): Promise<TeamResponse> {
        const teamEntity = await AppDataSource
            .getRepository(Team)
            .findOne({
                where: {
                    id: teamId
                },
                relations: {
                    player1: true,
                    player2: true,
                }
            });
        const team = new TeamResponse();
        if (!teamEntity) {
            team.id = -1;
            return team;
        }
        return TeamResponse.MapFromEntity(teamEntity);
    }

    public async getAllTeams(): Promise<TeamResponse[]> {
        const tournaments = await AppDataSource.getRepository(Team).find({
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
        const team = await AppDataSource.getRepository(Team).find({
            select: {
                id: true,
                name: true,
            },
        });
        const teamResponse = team.map(t => TeamListResponse.MapFromEntity(t))
        return teamResponse;
    }

    public async deleteTeamById(id: number) {
        return await AppDataSource.getRepository(Team).delete(id);
    }


}       