import { Team } from "../../entity/Team.entity";

export class TeamNoPlayer {
    public static MapFromEntity(t: Team): TeamNoPlayer {
        return {
            id: t.id,
            name: t.name,
        } as TeamNoPlayer;
    }
    id!: number;
    name!: string;
}