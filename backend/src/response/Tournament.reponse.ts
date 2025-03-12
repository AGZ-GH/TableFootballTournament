import { MatchResponse } from "./match/Match.response"

export class TournamentResponse {
    id!: number
    name!: string
    description: string = ""
    startingDate!: Date
    endDate!: Date
    matches?: MatchResponse[]
}       