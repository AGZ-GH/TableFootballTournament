import { TeamResponse } from "./Team.response"

export class MatchResponse extends Response {
    id!: number
    date!: Date
    scoreTeam1: number = 0
    scoreTeam2: number = 0
    team1!: TeamResponse
    team2!: TeamResponse
}       