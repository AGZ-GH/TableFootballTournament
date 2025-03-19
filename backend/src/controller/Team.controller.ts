import { StatusCodes } from "http-status-codes";
import { TeamService } from "../services/Team.service";
import { NextFunction, Request, Response } from "express";
import { CreateTeamRequest } from "../request/team/CreateTeam.request";
import { UpdateTeamRequest } from "../request/team/UpdateTeam.request";
import { FilterTeamByIdRequest } from "../request/team/FilterTeamById.request";


const teamService = new TeamService();

export const getTeamById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.teamId);
        const team = await teamService.getTeamById(id);
        return res.status(200).json(team);
    }
    catch (error) {
        next(error);
    }
}

export const getTeamByPlayerId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.playerId);
        const team = await teamService.getTeamByPlayerId(id);
        return res.status(200).json(team);
    }
    catch (error) {
        next(error);
    }
}

export const filterTeamsByIds = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const team = await teamService.filterTeamsByIds(req.body as FilterTeamByIdRequest);
        return res.status(StatusCodes.OK).json(team);
    }
    catch (error) {
        next(error);
    }
}

export const createTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        await teamService.createTeam(req.body as CreateTeamRequest);
        return res.status(StatusCodes.CREATED).send("Team created");
    }
    catch (error) {
        next(error);
    }
}

export const updateTeamById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.teamId);
        teamService.updateTeamById(id, req.body as UpdateTeamRequest);
        return res.status(StatusCodes.OK).send("Team updated");
    }
    catch (error) {
        next(error);
    }
}

export const getAllTeams = async (req: Request, res: Response): Promise<Response> => {
    try {
        const tournaments = await teamService.getAllTeams();
        return res.status(StatusCodes.OK).json(tournaments);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to fetch all the teams");
    }
}
export const getAllTeamsIdAndName = async (req: Request, res: Response): Promise<Response> => {
    try {
        const tournaments = await teamService.getAllTeamsIdAndName();
        return res.status(StatusCodes.OK).json(tournaments);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to fetch all the teams list");
    }
}

export const deleteTeamById = async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.teamId);
    try {
        await teamService.deleteTeamById(id);
        return res.status(StatusCodes.OK).send("Team deleted");
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Failed to delete team")
    }
}
