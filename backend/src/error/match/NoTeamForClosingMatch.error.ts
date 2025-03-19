import BadRequestError from "../BadRequest.error";

export default class NoTeamForClosingMatchError extends BadRequestError {
    constructor(matchId: number) {
        super({ message: "Match closed, no team in the match", context: {"matchId": matchId} });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}