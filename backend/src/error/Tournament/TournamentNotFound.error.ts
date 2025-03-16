import NotFoundError from "../NotFound.error";

export default class TournamentNotFoundError extends NotFoundError {
    constructor(tournamentId: number) {
        super({ message: "Tournament not found", context: {"tournamentId": tournamentId} });
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}