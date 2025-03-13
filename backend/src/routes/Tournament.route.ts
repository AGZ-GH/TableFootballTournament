import { Request, Response } from "express";
import { TournamentService } from "../services/Tournament.service";
import { CreateTournamentRequest } from "../request/tournament/CreateTournament.request";

const express = require("express");
const router = express.Router();

const tournamentService = new TournamentService();

router.post("/create", (req: Request, res: Response): Response => {
    try {
        tournamentService.createTournament(req.body as CreateTournamentRequest);
        return res.status(201).send({ data: "Tournament created" });
    }catch(error){
        console.error(error)
        return res.status(500).send("Failed to create the tournament")
    }

});

router.post("/generate", (req: Request, res: Response): Response => {
    return res.status(500).send({ data: "Not implemented yet" });
});

router.get("/:tournamentId", async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.tournamentId);
    try {
        const tournament = await tournamentService.getTournamentById(id)
            .catch((error) => res.status(500).send("Failed to get tournament"));
        if (!tournament) {
            return res.status(404).send("Not found");
        }
        return res.status(200).json(tournament);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to search for the tournament");
    }
});

router.delete("/:tournamentId", async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.productID);
    try {
        await tournamentService.deleteTournamentById(id)
        return res.status(200).send("Tournament deleted");
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to delete tournament")
    }
});

module.exports = router;