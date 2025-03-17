import BadRequestError from "../BadRequest.error";

export default class TournamentAlreadyGenerated extends BadRequestError {
    constructor(tournamentId: number) {
        super({
            message: `Tournament with id: ${tournamentId} already generated`,
            context: {
                "tournamentId":tournamentId,
            }
        });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}