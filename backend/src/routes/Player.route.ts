import { NextFunction, Request, Response } from "express";
import { PlayerService } from "../services/Player.service";
import { CreatePlayerRequest } from "../request/player/CreatePlayer.request";
import { UpdatePlayerRequest } from "../request/player/UpdatePlayer.request";
import { LoginPlayerRequest } from "../request/player/LoginPlayer.request";

const express = require("express");
const router = express.Router();

const playerService = new PlayerService();


router.get("/:playerId(\\d+)", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.playerId);
        const player = await playerService.getPlayerById(id);
        return res.status(200).json(player);
    }
    catch (error) {
        next(error);
    }
});

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await playerService.createPlayer(req.body as CreatePlayerRequest);
        return res.status(200).send("Player created");
    }
    catch (error) {
        next(error);
    }
});

router.post("/update/:playerId(\\d+)", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.playerId);
        await playerService.UpdatePlayer(id, req.body as UpdatePlayerRequest);
        return res.status(200).send("Player updated");
    }
    catch (error) {
        next(error);
    }
});

router.delete("/:playerId(\\d+)", async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.playerId);
    try {
        await playerService.deletePlayerById(id)
        return res.status(200).send("Player deleted");
    }
    catch (error) {
        next(error);
    }
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loggingData = await playerService.loginPlayer(req.body as LoginPlayerRequest);
        return res.status(200).send(loggingData);
    }
    catch (error) {
        next(error);
    }
});

router.post("/checkAdmin", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]?.toString().substring(7) ?? "";
        const isAdmin = await playerService.checkIsAdmin(token);

        return isAdmin ? res.status(200).send() : res.status(401);
    }
    catch (error) {
        next(error);
    }
});

router.get("/find/teamless/list", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teamlessPlayers = await playerService.getTeamlessPlayers();
        return res.status(200).send(teamlessPlayers);
    }
    catch (error) {
        next(error);
    }
});
module.exports = router;