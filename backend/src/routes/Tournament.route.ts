import { validateData } from "../middleware/DataValidation.middleware";
import { addTeamToTournament, createTournament, deleteTournamentById, generateTournament, getAllTournaments, getTournamentById, getTournamentWithMatchesById } from "../controller/Tournament.controller";
import { addTeamToTournamentSchema } from "../request/tournament/AddTeamToTournament.schema";
import { createTournamentSchema } from "../request/tournament/CreateTournament.schema";

const express = require("express");
const router = express.Router();

router.post("/create", validateData(createTournamentSchema), createTournament);
router.post("/generate/:tournamentId",generateTournament);
router.post("/addTeam", validateData(addTeamToTournamentSchema), addTeamToTournament);
router.get("/find/:tournamentId(\\d+)",getTournamentById);
router.get("/all", getAllTournaments);
router.get("/find/withMatches/:tournamentId(\\d+)", getTournamentWithMatchesById);
router.delete("/:tournamentId(\\d+)", deleteTournamentById);

module.exports = router;