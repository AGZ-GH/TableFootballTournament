import NotFoundError from "../NotFound.error";

export default class TeamNotFoundError extends NotFoundError {
    constructor(teamId: number) {
        super({ message: "Team not found", context: {"teamId": teamId} });
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}