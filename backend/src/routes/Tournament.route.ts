import { Request, Response } from "express";
import { TournamentService } from "../services/Tournament.service";
import { CreateTournamentRequest } from "../request/tournament/CreateTournament.request";
import { AddTeamToTournamentRequest } from "../request/tournament/AddTeamToTournament.request";
import { PlayerService } from "../services/Player.service";

const express = require("express");
const router = express.Router();

const tournamentService = new TournamentService();
const playerService = new PlayerService();

router.post("/create", async (req: Request, res: Response): Promise<Response> => {
    try {
        const token = req.headers["authorization"]?.toString().substring(7) ?? "";
        const isAdmin = await playerService.checkIsAdmin(token);
        if (!isAdmin) {
            return res.status(401).send("Unauthorized");
        }

        await tournamentService.createTournament(req.body as CreateTournamentRequest);
        return res.status(201).send({ data: "Tournament created" });
    } catch (error) {
        console.error(error)
        return res.status(500).send("Failed to create the tournament")
    }
});

router.post("/generate/:tournamentId", async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.tournamentId);
    await tournamentService.generateTournament(id)
        .catch(error => {
            console.error(error);
            return res.status(500).send({ data: "Couldn't generate the tournament" });
        })
    return res.status(200).send({ data: "Tournament created" });
});

router.post("/addTeam", async (req: Request, res: Response): Promise<Response> => {
    try {
        const data = req.body as AddTeamToTournamentRequest;
        await tournamentService.addTeamToTournament(data.tournamentId, data.teamId)
        return res.status(200).send({ data: "Team added" });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Failed to add the team to the tournament")
    }
})

router.get("/find/:tournamentId", async (req: Request, res: Response): Promise<Response> => {
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

router.get("/all", async (req: Request, res: Response): Promise<Response> => {
    try {
        const tournaments = await tournamentService.getAllTournaments();
        return res.status(200).json(tournaments);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to fetch all the tournaments");
    }
});
router.get("/find/withMatches/:tournamentId", async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.tournamentId);
        const tournaments = await tournamentService.getTournamentWithMatchesById(id );
        return res.status(200).json(tournaments);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to the tournaments with its matches");
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