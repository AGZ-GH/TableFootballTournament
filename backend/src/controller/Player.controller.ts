import { NextFunction, Request, Response } from "express";
import { PlayerService } from "../services/Player.service";
import { LoginPlayerRequest } from "../request/player/LoginPlayer.request";

const playerService = new PlayerService();

export const loginPlayer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loggingData = await playerService.loginPlayer(req.body as LoginPlayerRequest);
        res.status(200).send(loggingData);
    }
    catch (error) {
        next(error);
    }
}
