export class CreateMatchRequest {
    date!: Date
    scoreTeam1: number = 0
    scoreTeam2: number = 0
    team1Id!: number
    team2Id!: number
    tournamentId!: number     
}       