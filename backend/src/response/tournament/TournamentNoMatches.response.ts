import { Tournament } from "../../entity/Tournament.entity"
import { TeamResponse } from "../team/Team.reponse"

export class TournamentNoMatchesResponse {
    public static MapFromEntity(t: Tournament) {
        return {
            id: t.id,
            name: t.name,
            description: t.description,
            startingDate: t.startingDate,
            endDate: t.endDate,
            teams: t.teams.map(t => TeamResponse.MapFromEntity(t)),
        }
    }       
    id!: number;
    name!: string;
    description: string = "";
    startingDate!: Date;
    endDate!: Date;
    teams!: TeamResponse[];
}