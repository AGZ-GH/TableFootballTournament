import { createTeam, deleteTeamById, filterTeamsByIds, getAllTeams, getAllTeamsIdAndName, getTeamById, getTeamByPlayerId, updateTeamById } from "../controller/Team.controller";
import { validateData } from "../middleware/DataValidation.middleware";
import { createTeamSchema } from "../request/team/CreateTeam.schema";
import { filterTeamByIdSchema } from "../request/team/FilterTeamById.schema";
import { updateTeamSchema } from "../request/team/UpdateTeam.schema";

const express = require("express");
const router = express.Router();

router.get("/find/:teamId(\\d+)", getTeamById);
router.get("/find/byPlayer/:playerId(\\d+)", getTeamByPlayerId);
router.post("/filter/byIds/list", validateData(filterTeamByIdSchema), filterTeamsByIds);
router.post("/", validateData(createTeamSchema), createTeam);
router.post("/:teamId(\\d+)", validateData(updateTeamSchema), updateTeamById);
router.get("/all", getAllTeams);
router.get("/list/all", getAllTeamsIdAndName);
router.delete("/:teamId(\\d+)", deleteTeamById);

module.exports = router;