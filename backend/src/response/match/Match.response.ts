import { Match } from "../../entity/Match.entity"
import { TeamResponse } from "../team/Team.reponse"
import { TeamNoPlayer } from "../team/TeamNoPlayer.response"

export class MatchResponse {
    public static MapFromEntity(m: Match) {
        return {
            id: m.id,
            date: m.date,
            scoreTeam1: m.scoreTeam1,
            scoreTeam2: m.scoreTeam2,
            team1: TeamNoPlayer.MapFromEntity(m.team1),
            team2: TeamNoPlayer.MapFromEntity(m.team2),
        } as MatchResponse
    }
    id!: number
    date!: Date
    scoreTeam1: number = 0
    scoreTeam2: number = 0
    team1!: TeamResponse
    team2!: TeamResponse
}