import { NextFunction, Request, Response } from "express";
import { TournamentService } from "../services/Tournament.service";
import { CreateTournamentRequest } from "../request/tournament/CreateTournament.request";
import { AddTeamToTournamentRequest } from "../request/tournament/AddTeamToTournament.request";
import { PlayerService } from "../services/Player.service";
import { StatusCodes } from "http-status-codes";

const express = require("express");
const router = express.Router();

const tournamentService = new TournamentService();
const playerService = new PlayerService();

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]?.toString().substring(7) ?? "";
        const isAdmin = await playerService.checkIsAdmin(token);
        if (!isAdmin) {
            return res.status(401).send("Unauthorized");
        }

        await tournamentService.createTournament(req.body as CreateTournamentRequest);
        return res.status(201).send({ data: "Tournament created" });
    } catch (error) {
        next(error);
    }
});

router.post("/generate/:tournamentId", async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.tournamentId);
    await tournamentService.generateTournament(id)
        .catch(error => {
            next(error);
        })
    return res.status(StatusCodes.OK).send({ data: "Tournament created" });
});

router.post("/addTeam", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body as AddTeamToTournamentRequest;
        const tournament = await tournamentService.addTeamToTournament(data.tournamentId, data.teamId)
        return res.status(StatusCodes.OK).json(tournament);
    } catch (error) {
        next(error);
    }
})

router.get("/find/:tournamentId(\\d+)", async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.tournamentId);
    try {
        const tournament = await tournamentService.getTournamentById(id)
        return res.status(StatusCodes.OK).json(tournament);
    }
    catch (error) {
        next(error);
    }
});

router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tournaments = await tournamentService.getAllTournaments();
        return res.status(StatusCodes.OK).json(tournaments);
    }
    catch (error) {
        next(error);
    }
});
router.get("/find/withMatches/:tournamentId(\\d+)", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.tournamentId);
        const tournaments = await tournamentService.getTournamentWithMatchesById(id);
        return res.status(StatusCodes.OK).json(tournaments);
    }
    catch (error) {
        next(error);
    }
});
router.delete("/:tournamentId(\\d+)", async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.productID);
    try {
        await tournamentService.deleteTournamentById(id)
        return res.status(StatusCodes.OK).send("Tournament deleted");
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;