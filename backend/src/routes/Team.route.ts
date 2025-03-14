import { Request, Response } from "express";
import { TeamService } from "../services/Team.service";
import { CreateTeamRequest } from "../request/team/CreateTeam.request";
import { UpdateTeamRequest } from "../request/team/UpdateTeam.request";

const express = require("express");
const router = express.Router();

const teamService = new TeamService();

router.get("/:teamId", async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.teamId);
        const team = await teamService.getTeamById(id);
        if (!team || team.id < 1) {
            return res.status(404).send("Not found");
        }
        return res.status(200).json(team);
    }
    catch (error) {
        console.error(error)
        return res.status(500).send("Failed to search for the team");
    }
});

router.post("/", async (req: Request, res: Response): Promise<Response> => {
    try {
        await teamService.createTeam(req.body as CreateTeamRequest);
        return res.status(200).send("Team created");
    }
    catch (error) {
        console.error(error)
        return res.status(500).send("Failed to create the team");
    }
});

router.post("/:teamId", async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.teamId);
        teamService.updateTeamById(id, req.body as UpdateTeamRequest);
        return res.status(200).send("Team updated");
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to update the team");
    }
});

router.delete("/:teamId", async (req: Request, res: Response): Promise<Response> => {
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