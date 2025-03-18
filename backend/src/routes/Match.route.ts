import { NextFunction, Request, Response } from "express";
import { CreateMatchRequest } from "../request/match/CreateMatch.request";
import { MatchService } from "../services/Match.service";
import { UpdateMatchRequest } from "../request/match/UpdateMatch.request";
import { StatusCodes } from "http-status-codes";

const express = require("express");
const router = express.Router();

const matchService = new MatchService();

router.get("/find/:matchId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.matchId);
        const match = await matchService.getMatchById(id);
        return res.status(StatusCodes.OK).json(match);
    }
    catch (error) {
        next(error);
    }
});
router.get("/list/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const matches = await matchService.findAll();
        return res.status(StatusCodes.OK).json(matches);
    }
    catch (error) {
        next(error);
    }
});

router.get("/find/byTournament/:tournamentId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tournamentId = Number(req.params.tournamentId);
        const matches = await matchService.findTournamentMatches(tournamentId);
        return res.status(StatusCodes.OK).json(matches);
    }
    catch (error) {
        next(error);
    }
});

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        matchService.createMatch(req.body as CreateMatchRequest);
        return res.status(StatusCodes.CREATED).send("Match created");
    }
    catch (error) {
        next(error);
    }
});

router.post("/:matchId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.matchId);
        matchService.updateMatch(id, req.body as UpdateMatchRequest)
        return res.status(StatusCodes.OK).send("Match updated");
    }
    catch (error) {
        next(error);
    }
});

router.delete("/delete/:matchId", async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.teamId);
    try {
        matchService.deleteMatch(id);
        return res.status(StatusCodes.OK).send("Match deleted");
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;