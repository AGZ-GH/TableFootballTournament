import { Team } from "../../entity/Team.entity";


export class TeamListResponse {
    static MapFromEntity(t: Team) : TeamListResponse {
        return {
            id: t.id,
            name: t.name,
        }
    }
    id!: number;
    name!: string;
}