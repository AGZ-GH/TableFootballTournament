import { NextFunction, Request, Response } from "express";
import { TournamentService } from "../services/Tournament.service";
import { CreateTournamentRequest } from "../request/tournament/CreateTournament.request";
import { AddTeamToTournamentRequest } from "../request/tournament/AddTeamToTournament.request";
import { PlayerService } from "../services/Player.service";
import { StatusCodes } from "http-status-codes";

const playerService = new PlayerService();
const tournamentService = new TournamentService();


export const createTournament = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]?.toString().substring(7) ?? "";
        const isAdmin = await playerService.checkIsAdmin(token);
        if (!isAdmin) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
        }

        await tournamentService.createTournament(req.body as CreateTournamentRequest);
        return res.status(StatusCodes.CREATED).send({ data: "Tournament created" });
    } catch (error) {
        next(error);
    }
}

export const generateTournament = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.tournamentId);
    await tournamentService.generateTournament(id)
        .catch(error => {
            next(error);
        })
    return res.status(StatusCodes.OK).send({ data: "Tournament created" });
}

export const addTeamToTournament = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body as AddTeamToTournamentRequest;
        const tournament = await tournamentService.addTeamToTournament(data.tournamentId, data.teamId)
        return res.status(StatusCodes.OK).json(tournament);
    } catch (error) {
        next(error);
    }
}

export const getTournamentById = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.tournamentId);
    try {
        const tournament = await tournamentService.getTournamentById(id)
        return res.status(StatusCodes.OK).json(tournament);
    }
    catch (error) {
        next(error);
    }
}

export const getAllTournaments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tournaments = await tournamentService.getAllTournaments();
        return res.status(StatusCodes.OK).json(tournaments);
    }
    catch (error) {
        next(error);
    }
}

export const getTournamentWithMatchesById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.tournamentId);
        const tournaments = await tournamentService.getTournamentWithMatchesById(id);
        return res.status(StatusCodes.OK).json(tournaments);
    }
    catch (error) {
        next(error);
    }
}

export const deleteTournamentById = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.productID);
    try {
        await tournamentService.deleteTournamentById(id)
        return res.status(StatusCodes.OK).send("Tournament deleted");
    }
    catch (error) {
        next(error);
    }
}