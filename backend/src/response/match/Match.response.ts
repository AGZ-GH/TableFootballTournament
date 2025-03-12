import { TeamResponse } from "../team/Team.reponse"

export class MatchResponse {
    id!: number
    date!: Date
    scoreTeam1: number = 0
    scoreTeam2: number = 0
    team1!: TeamResponse    
    team2!: TeamResponse
}       