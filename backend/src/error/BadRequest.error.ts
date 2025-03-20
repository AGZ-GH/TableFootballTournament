import { StatusCodes } from "http-status-codes";
import { HttpError } from "./HttpError";

export default class BadRequestError extends HttpError {
    private static readonly statusCode = StatusCodes.BAD_REQUEST;
    private readonly code: number;
    private readonly context: { [key: string]: any };

    constructor(params?: {errorName?: string, code?: number, message?: string, context?: { [key: string]: any } }) {
        const { code, message } = params || {};
        super(message ?? "Bad request");
        this.code = code ?? BadRequestError.statusCode;
        this.context = params?.context || {};
        this.name = params?.errorName ?? "BadRequest";

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    get errors() {
        return [{ name: this.name ,message: this.message, context: this.context }];
    }

    get statusCode() {
        return this.code;
    }

}