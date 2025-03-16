import { Tournament } from "../../entity/Tournament.entity"
import { MatchResponse } from "../match/Match.response"
import { TeamResponse } from "../team/Team.reponse"

export class TournamentResponse {
    public static MapFromEntity(t: Tournament) {
        return {
            id: t.id,
            name: t.name,
            description: t.description,
            startingDate: t.startingDate,
            endDate: t.endDate,
            matches: t.matches?.map(m => MatchResponse.MapFromEntity(m)),
            teams: t.teams.map(t => TeamResponse.MapFromEntity(t)),
        }
    }
    id!: number
    name!: string
    description: string = ""
    startingDate!: Date
    endDate!: Date
    matches?: MatchResponse[]
    teams?: TeamResponse[]
}