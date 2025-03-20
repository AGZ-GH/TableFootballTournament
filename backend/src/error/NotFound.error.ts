import { StatusCodes } from "http-status-codes";
import { HttpError } from "./HttpError";

export default class NotFoundError extends HttpError {
    private static readonly statusCode = StatusCodes.NOT_FOUND;
    private readonly code: number;
    private readonly context: { [key: string]: any };

    constructor(params?: {errorName?: string, code?: number, message?: string, context?: { [key: string]: any } }) {
        const { code, message } = params || {};

        super(message ?? "Not found");
        this.code = code ?? NotFoundError.statusCode;
        this.context = params?.context || {};
        this.name = params?.errorName ?? "NotFound"

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    get errors() {
        return [{name:this.name ,message: this.message, context: this.context }];
    }

    get statusCode() {
        return this.code;
    }

}