import { NextFunction, Request, Response } from "express";
import { HttpError } from "../error/HttpError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction)    => {  
    console.log(err);
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({error: err.message});
    }
    else{
        res.status(500).send('Unhandeled Internal Server Error' );
    }
}
