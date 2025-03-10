import { MatchResponse } from "./Match.response"

export class TournamentResponse extends Response{
    id!: number
    name!: string
    description: string = ""
    startingDate!: Date
    endDate!: Date
    matches?: MatchResponse[]
}       