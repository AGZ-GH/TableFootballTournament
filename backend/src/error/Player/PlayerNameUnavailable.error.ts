import BadRequestError from "../BadRequest.error";

export default class PlayerNameUnavailable extends BadRequestError {
    constructor() {
        super({ message: "Player name already exist" });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}