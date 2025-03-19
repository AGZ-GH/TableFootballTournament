import { StatusCodes } from "http-status-codes";
import { MatchService } from "../services/Match.service";
import { NextFunction, Request, Response } from "express";
import { UpdateMatchRequest } from "../request/match/UpdateMatch.request";
import { CreateMatchRequest } from "../request/match/CreateMatch.request";

const matchService = new MatchService();

export const getMatchById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.matchId);
        const match = await matchService.getMatchById(id);
        return res.status(StatusCodes.OK).json(match);
    }
    catch (error) {
        next(error);
    }
}

export const findAllMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const matches = await matchService.findAll();
        return res.status(StatusCodes.OK).json(matches);
    }
    catch (error) {
        next(error);
    }
}

export const findTournamentMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tournamentId = Number(req.params.tournamentId);
        const matches = await matchService.findTournamentMatches(tournamentId);
        return res.status(StatusCodes.OK).json(matches);
    }
    catch (error) {
        next(error);
    }
}

export const createMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        matchService.createMatch(req.body as CreateMatchRequest);
        return res.status(StatusCodes.CREATED).send("Match created");
    }
    catch (error) {
        next(error);
    }
}

export const updateMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.matchId);
        console.log(req.body)
        matchService.updateMatch(id, req.body as UpdateMatchRequest)
        return res.status(StatusCodes.OK).send("Match updated");
    }
    catch (error) {
        next(error);
    }
}

export const deleteMatch = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.teamId);
    try {
        matchService.deleteMatch(id);
        return res.status(StatusCodes.OK).send("Match deleted");
    }
    catch (error) {
        next(error);
    }
}