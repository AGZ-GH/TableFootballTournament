import { validateData } from "../middleware/DataValidation.middleware";
import { loginPlayerSchema } from "../request/player/LoginPlayer.schema"
import { checkAdmin, createNewPlayer, deletePlayer, findTeamlessPlayers, getPlayer, loginPlayer, updatePlayer } from "../controller/Player.controller";
import { updatePlayerSchema } from "../request/player/UpdatePlayer.schema";
import { createPlayerSchema } from "../request/player/CreatePlayer.schema";

const express = require("express");
const router = express.Router();


/**
 * @swagger
 * /player/{id}:
 *   get:
 *     summary: Get player by ID.
 *     description: Get player by ID.
 *     parameters:
 *       - in: path
 *         name: playerId
 *         schema:
 *           type: string
 *         required: true
 *         description: return the player by it's ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: player   not found
 *       '500':
 *         description: Internal server error
 */
router.get("/:playerId(\\d+)", getPlayer);

/**
 * @swagger
 *  /create:
 *      post:
 *          summary: create a player.
 *          description: create a new player.
 *          requestBody:
 *              schema: object
 *              properties:
 *                  firstname:
 *                      type: string 
 *                  lastname:
 *                      type: string
 *                  password:
 *                      type: string
 *          responses:
 *              '201':
 *                  description: player created
 *              '400':
 *                  description: player name already exist'
 *              '500':
 *                  description: Internal server error
 */
router.post("/create", validateData(createPlayerSchema), createNewPlayer);
router.post("/update/:playerId(\\d+)", validateData(updatePlayerSchema), updatePlayer);
router.delete("/:playerId(\\d+)", deletePlayer);
router.post("/login", validateData(loginPlayerSchema), loginPlayer);
router.post("/checkAdmin", checkAdmin);
router.get("/find/teamless/list", findTeamlessPlayers);

module.exports = router;