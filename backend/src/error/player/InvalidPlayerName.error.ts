import BadRequestError from "../BadRequest.error";

export default class InvalidPlayerNameError extends BadRequestError {
    constructor() {
        super({ message: "Player doesn't exist" });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}