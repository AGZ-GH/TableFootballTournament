import { PlayerResponse } from "../player/Player.response"

export class TeamResponse {
    id!: number;
    name!: string;
    player1!: PlayerResponse;
    player2?: PlayerResponse;
}