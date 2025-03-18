import { validateData } from "../middleware/DataValidation.middleware";
import { loginPlayerSchema } from "../request/player/LoginPlayer.schema"
import { checkAdmin, deletePlayer, findTeamlessPlayers, getPlayer, loginPlayer, updatePlayer } from "../controller/Player.controller";
import { updatePlayerSchema } from "../request/player/UpdatePlayer.schema";

const express = require("express");
const router = express.Router();

router.get("/:playerId(\\d+)", getPlayer);
router.post("/create");
router.post("/update/:playerId(\\d+)", validateData(updatePlayerSchema), updatePlayer);
router.delete("/:playerId(\\d+)", deletePlayer);
router.post("/login", validateData(loginPlayerSchema), loginPlayer);
router.post("/checkAdmin", checkAdmin);
router.get("/find/teamless/list", findTeamlessPlayers);

module.exports = router;