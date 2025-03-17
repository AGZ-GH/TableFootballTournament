import BadRequestError from "../BadRequest.error";

export default class UnevenNumberOfParticipant extends BadRequestError {
    constructor(tournamentId: number) {
        super({
            message: `Tournament with id: ${tournamentId} can't be generated with uneven number of participants`,
            context: {
                "tournamentId":tournamentId,
            }
        });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}