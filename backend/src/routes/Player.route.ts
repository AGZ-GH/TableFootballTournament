import { Request, Response } from "express";
import { PlayerService } from "../services/Player.service";
import { CreatePlayerRequest } from "../request/player/CreatePlayer.request";
import { UpdatePlayerRequest } from "../request/player/UpdatePlayer.request";
import { LoginPlayerRequest } from "../request/player/LoginPlayer.request";

const express = require("express");
const router = express.Router();

const playerService = new PlayerService();

router.get("/:playerId", async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.playerId);
        const player = await playerService.getPlayerById(id);
        if (!player || player.id < 1) {
            return res.status(404).send("Not found");
        }
        return res.status(200).json(player);
    }
    catch (error) {
        console.error(error)
        return res.status(500).send("Failed to search for the player");
    }
});

router.post("/create", async (req: Request, res: Response): Promise<Response> => {
    try {
        await playerService.createPlayer(req.body as CreatePlayerRequest);
        return res.status(200).send("Player created");
    }
    catch (error) {
        console.error(error)
        return res.status(500).send("Failed to create the player");
    }
});

router.post("/update/:playerId", async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.playerId);
        await playerService.UpdatePlayer(id, req.body as UpdatePlayerRequest);
        return res.status(200).send("Player updated");
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to update the player");
    }
});

router.delete("/:playerId", async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.playerId);
    try {
        await playerService.deletePlayerById(id)
        return res.status(200).send("Player deleted");
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to delete Player")
    }
});

router.post("/login", async (req: Request, res: Response): Promise<Response> => {
    try {
        const token = await playerService.loginPlayer(req.body as LoginPlayerRequest);
        return res.status(200).send(token);
    }
    catch (error) {
        console.error(error)
        return res.status(500).send("Failed to login the player");
    }
});

module.exports = router;