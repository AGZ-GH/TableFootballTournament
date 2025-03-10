import { PlayerResponse } from "./Player.response"

export class TeamResponse extends Response {
    id!: number
    name!: String
    player1!: PlayerResponse
    player2?: PlayerResponse           
}  