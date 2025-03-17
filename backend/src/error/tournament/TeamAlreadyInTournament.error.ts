import BadRequestError from "../BadRequest.error";

export default class TeamAlreadyInTournament extends BadRequestError {
    constructor(teamId: number, tournamentId: number) {
        super({
            message: `Team with id:${teamId} is already in the tournament`,
            context: {
                "teamId":teamId,
                "tournamentId":tournamentId,
            }
        });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}