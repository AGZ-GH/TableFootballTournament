import { Team } from "../../entity/Team.entity";
import { PlayerResponse } from "../player/Player.response"

export class TeamResponse {
    public static MapFromEntity(t: Team): TeamResponse {
        return {
            id: t.id,
            name: t.name,
            player1: PlayerResponse.MapFromEntity(t.player1),
            player2: t.player2 ? PlayerResponse.MapFromEntity(t.player2) : undefined,
        } as TeamResponse;
    }
    id!: number;
    name!: string;
    player1!: PlayerResponse;
    player2?: PlayerResponse;
}