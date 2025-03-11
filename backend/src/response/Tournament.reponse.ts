import { MatchResponse } from "./Match.response"

export class TournamentResponse {
    id!: number
    name!: string
    description: string = ""
    startingDate!: Date
    endDate!: Date
    matches?: MatchResponse[]
}       