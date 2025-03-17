import NotFoundError from "../NotFound.error";

export default class MatchNotFoundError extends NotFoundError {
    constructor(matchId: number) {
        super({ message: "Match not found", context: {"matchId": matchId} });
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}