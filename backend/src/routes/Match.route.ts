import { Request, Response } from "express";
import { CreateMatchRequest } from "../request/match/CreateMatch.request";
import { MatchService } from "../services/Match.service";
import { UpdateMatchRequest } from "../request/match/UpdateMatch.request";

const express = require("express");
const router = express.Router();

const matchService = new MatchService();

router.get("/:matchId", async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.match);
        const match = await matchService.getMatchById(id);
        if (!match || match.id < 1) {
            return res.status(404).send("Not found");
        }
        return res.status(200).json(match);
    }
    catch (error) {
        console.error(error)
        return res.status(500).send("Failed to search for the match");
    }
});

router.post("/", async (req: Request, res: Response): Promise<Response> => {
    try {
        matchService.createMatch(req.body as CreateMatchRequest);
        return res.status(200).send("Match created");
    }
    catch (error) {
        console.error(error)
        return res.status(500).send("Failed to create the match");
    }
});

router.post("/:matchId", async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.matchId);
        matchService.updateMatch(id, req.body as UpdateMatchRequest)
        return res.status(200).send("Match updated");
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to update the match");
    }
});

router.delete("/:matchId", async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.teamId);
    try {
        matchService.deleteMatch(id);
        return res.status(200).send("Match deleted");
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to delete match")
    }
});

module.exports = router;