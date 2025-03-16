import { HttpError } from "./HttpError";

export default class BadRequestError extends HttpError {
    private static readonly statusCode = 400;
    private readonly code: number;
    private readonly context: { [key: string]: any };

    constructor(params?: { code?: number, message?: string, context?: { [key: string]: any } }) {
        const { code, message } = params || {};

        super(message ?? "Bad request");
        this.code = code ?? BadRequestError.statusCode;
        this.context = params?.context || {};

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    get errors() {
        return [{ message: this.message, context: this.context }];
    }

    get statusCode() {
        return this.code;
    }

}