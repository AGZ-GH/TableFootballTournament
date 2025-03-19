import BadRequestError from "../BadRequest.error";

export default class MatchClosedError extends BadRequestError {
    constructor(matchId: number) {
        super({ message: "Match closed, cannot be updated", context: {"matchId": matchId} });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}