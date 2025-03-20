export type CustomErrorContent = {
    name: string,
    message: string,
    context?: { [key: string]: any }
};

export abstract class HttpError extends Error {
    abstract readonly statusCode: number;
    abstract readonly errors: CustomErrorContent[];

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}