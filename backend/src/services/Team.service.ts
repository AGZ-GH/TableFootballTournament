import { AppDataSource } from "../data-source";
import { Player } from "../entity/Player.entity";
import { Team } from "../entity/Team.entity";
import { CreateTeamRequest } from "../request/team/CreateTeam.request";
import { UpdateTeamRequest } from "../request/team/UpdateTeam.request";
import { TeamResponse } from "../response/team/Team.reponse";
import { PlayerService } from "./Player.service";

const playerService = new PlayerService();

export class TeamService {
    async createTeam(team: CreateTeamRequest) {
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

    async updateTeamById(id: number, team: UpdateTeamRequest) {
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

    async getTeamById(id: number): Promise<TeamResponse> {
        const teamEntity = await AppDataSource
            .getRepository(Team)
            .createQueryBuilder("team")
            .select("team")
            .leftJoin("team.player1","player1")
            .leftJoin("team.player2","player2")
            .select(['team'])
            .addSelect(['player1.id', 'player1.firstName', 'player1.lastName'])
            .addSelect(['player2.id', 'player2.firstName', 'player2.lastName'])
            .where("team.id = :id", {id : id})
            .getOne();
        const team = new TeamResponse();
        if (!teamEntity) {
            team.id = -1;
            return team;
        }
        team.id = teamEntity.id;
        team.name = teamEntity.name ;
        team.player1 = teamEntity.player1;
        team.player2 = teamEntity.player2;

        return team;
    }

    async deleteTeamById(id: number) {
        return await AppDataSource.getRepository(Team).delete(id);
    }
}       