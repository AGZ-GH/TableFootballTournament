import { Team } from "../../entity/Team.entity";
import { PlayerResponse } from "../player/Player.response"

export class TeamResponse {
    public static MapFromEntity(t: Team): TeamResponse {
        return {
            id: t.id,
            name: t.name,
            player1: {
                id: t.player1.id,
                firstname: t.player1.firstname,
                lastname: t.player1.lastname
            },
            player2: {
                id: t.player2?.id ?? 0,
                firstname: t.player2?.firstname ?? "",
                lastname: t.player2?.lastname ?? ""
            },
        } as TeamResponse;
    }
    id!: number;
    name!: string;
    player1!: PlayerResponse;
    player2?: PlayerResponse;
}