import NotFoundError from "../NotFound.error";

export default class PlayerTeamNotFound extends NotFoundError {
    constructor(playerId: number) {
        super({ 
            message: `Team not found for player with id: ${playerId}`, 
            context: {"playerId": playerId},
         });
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}