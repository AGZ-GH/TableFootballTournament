import { Tournament } from "../../entity/Tournament.entity"
import { MatchResponse } from "../match/Match.response"

export class TournamentResponse {
    public static MapFromEntity(t: Tournament){
        return{
            id: t.id,
            name: t.name,
            description: t.description,
            startingDate: t.startingDate,
            endDate: t.endDate,
            matches: t.matches?.map(m => MatchResponse.MapFromEntity(m)),
        }
    }
    id!: number
    name!: string
    description: string = ""
    startingDate!: Date
    endDate!: Date
    matches?: MatchResponse[]
}