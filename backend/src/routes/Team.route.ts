import { NextFunction, Request, Response } from "express";
import { TeamService } from "../services/Team.service";
import { CreateTeamRequest } from "../request/team/CreateTeam.request";
import { UpdateTeamRequest } from "../request/team/UpdateTeam.request";

const express = require("express");
const router = express.Router();

const teamService = new TeamService();

router.get("/find/:teamId(\\d+)", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.teamId);
        const team = await teamService.getTeamById(id);
        return res.status(200).json(team);
    }
    catch (error) {
        next(error);
    }   
});

router.get("/find/byPlayer/:playerId(\\d+)", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.playerId);
        const team = await teamService.getTeamByPlayerId(id);
        return res.status(200).json(team);
    }
    catch (error) {
        next(error);
    }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await teamService.createTeam(req.body as CreateTeamRequest);
        return res.status(200).send("Team created");
    }
    catch (error) {
        next(error);
    }
});

router.post("/:teamId(\\d+)", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.teamId);
        teamService.updateTeamById(id, req.body as UpdateTeamRequest);
        return res.status(200).send("Team updated");
    }
    catch (error) {
        next(error);
    }
});

router.get("/all", async (req: Request, res: Response): Promise<Response> => {
    try {
        const tournaments = await teamService.getAllTeams();
        return res.status(200).json(tournaments);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to fetch all the teams");
    }
});
router.get("/list/all", async (req: Request, res: Response): Promise<Response> => {
    try {
        const tournaments = await teamService.getAllTeamsIdAndName();
        return res.status(200).json(tournaments);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to fetch all the teams list");
    }
});

router.delete("/:teamId(\\d+)", async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.teamId);
    try {
        await teamService.deleteTeamById(id);
        return res.status(200).send("Team deleted");
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to delete team")
    }
});

module.exports = router;