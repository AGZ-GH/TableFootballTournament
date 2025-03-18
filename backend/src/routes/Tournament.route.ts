import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validateData } from "../middleware/DataValidation.middleware";
import { addTeamToTournament, createTournament, deleteTournamentById, generateTournament, getAllTournaments, getTournamentById, getTournamentWithMatchesById } from "../controller/Tournament.controller";
import { addTeamToTournamentSchema } from "../request/tournament/AddTeamToTournament.schema";
import { createTeamSchema } from "../request/team/CreateTeam.schema";

const express = require("express");
const router = express.Router();

router.post("/create", validateData(createTeamSchema), createTournament);
router.post("/generate/:tournamentId",generateTournament);
router.post("/addTeam", validateData(addTeamToTournamentSchema), addTeamToTournament);
router.get("/find/:tournamentId(\\d+)",getTournamentById);
router.get("/all", getAllTournaments);
router.get("/find/withMatches/:tournamentId(\\d+)", getTournamentWithMatchesById);
router.delete("/:tournamentId(\\d+)", deleteTournamentById);

module.exports = router;