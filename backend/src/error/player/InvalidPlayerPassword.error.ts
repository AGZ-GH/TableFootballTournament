import BadRequestError from "../BadRequest.error";

export default class InvalidPlayerPasswordError extends BadRequestError {
    constructor() {
        super({ message: "Invalid password" });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}