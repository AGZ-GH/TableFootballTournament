import NotFoundError from "../NotFound.error";

export default class PlayerNotFoundError extends NotFoundError {
    constructor(playerId: number) {
        super({ message: "Player not found", context: {"playerId": playerId} });
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}