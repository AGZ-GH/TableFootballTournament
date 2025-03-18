import { createMatch, deleteMatch, findAllMatches, findTournamentMatches, getMatchById, updateMatch } from "../controller/Match.controller";
import { validateData } from "../middleware/DataValidation.middleware";
import { updateMatchSchema } from "../request/match/UpdateMatch.schema";
import { createMatchSchema } from "../request/match/CreateMatch.schema";

const express = require("express");
const router = express.Router();

router.get("/find/:matchId", getMatchById);
router.get("/list/all", findAllMatches);
router.get("/find/byTournament/:tournamentId", findTournamentMatches);
router.post("/create", validateData(createMatchSchema),createMatch);
router.post("/:matchId",validateData(updateMatchSchema),updateMatch);
router.delete("/delete/:matchId", deleteMatch);

module.exports = router;