import { NextFunction, Request, Response } from "express";
import { PlayerService } from "../services/Player.service";
import { LoginPlayerRequest } from "../request/player/LoginPlayer.request";
import { StatusCodes } from "http-status-codes";
import { CreatePlayerRequest } from "../request/player/CreatePlayer.request";
import { UpdatePlayerRequest } from "../request/player/UpdatePlayer.request";

const playerService = new PlayerService();

export const loginPlayer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loggingData = await playerService.loginPlayer(req.body as LoginPlayerRequest);
        res.status(StatusCodes.OK).send(loggingData);
    }
    catch (error) {
        next(error);
    }
}

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]?.toString().substring(7) ?? "";
        const isAdmin = await playerService.checkIsAdmin(token);
        return isAdmin ? res.status(StatusCodes.OK).send() : res.status(401);
    }
    catch (error) {
        next(error);
    }
}

export const findTeamlessPlayers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teamlessPlayers = await playerService.getTeamlessPlayers();
        return res.status(StatusCodes.OK).send(teamlessPlayers);
    }
    catch (error) {
        next(error);
    }
}

export const createNewPlayer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await playerService.createPlayer(req.body as CreatePlayerRequest);
        return res.status(StatusCodes.CREATED).send("Player created");
    }
    catch (error) {
        next(error);
    }
}

export const updatePlayer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.playerId);
        await playerService.UpdatePlayer(id, req.body as UpdatePlayerRequest);
        return res.status(StatusCodes.OK).send("Player updated");
    }
    catch (error) {
        next(error);
    }
}

export const deletePlayer = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.playerId);
    try {
        await playerService.deletePlayerById(id)
        return res.status(StatusCodes.OK).send("Player deleted");
    }
    catch (error) {
        next(error);
    }
}

export const getPlayer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.playerId);
        const player = await playerService.getPlayerById(id);
        return res.status(StatusCodes.OK).json(player);
    }
    catch (error) {
        next(error);
    }
}