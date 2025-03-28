import BadRequestError from "../BadRequest.error";

export default class MatchEqualityError extends BadRequestError {
    constructor(matchId: number) {
        super({ errorName:"MatchEquality" ,message: "Match cannot be closed on an equality", context: {"matchId": matchId} });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}