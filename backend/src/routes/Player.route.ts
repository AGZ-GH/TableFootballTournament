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
 *     tags: [Player]
 *     parameters:
 *       - in: path 
 *         name: playerId
 *         schema:
 *           type: number
 *         required: true
 *         description: player ID
 *     responses:
 *       '200':
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/PlayerResponse"  
 *       '404':
 *         description: player not found
 *       '500':
 *         description: Internal server error
 */
router.get("/:playerId(\\d+)", getPlayer);

/**
 * @swagger
 *  /player/create:
 *      post:
 *          summary: Create a player.
 *          description: Create a new player.
 *          tags: [Player]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: "#/components/schemas/CreatePlayerRequest"
 *          responses:
 *              '201':
 *                  description: player created
 *              '400':
 *                  description: player name already exist'
 *              '500':
 *                  description: Internal server error
 */
router.post("/create", validateData(createPlayerSchema), createNewPlayer);

/**
 * @swagger
 * /player/update/{id}:
 *   post:
 *     summary: Update player by ID.
 *     description: Update player by ID.
 *     tags: [Player]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: "#/components/schemas/UpdatePlayerRequest" 
 *     parameters:
 *       - in: path
 *         name: playerId
 *         schema:
 *           type: string
 *         required: true
 *         description: player ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: player   not found
 *       '500':
 *         description: Internal server error
 */
router.post("/update/:playerId(\\d+)", validateData(updatePlayerSchema), updatePlayer);

/**
 * @swagger
 * /player/{id}:
 *   delete:
 *     summary: Delete player by ID
 *     description: Delete player by ID
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: playerId
 *         schema:
 *           type: string
 *         required: true
 *         description: player ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: player   not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/:playerId(\\d+)", deletePlayer);

/**
 * @swagger
 * /player/login:
 *   post:
 *     summary: Login for users
 *     description: Login users and return them their ID and token
 *     tags: [Player]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: "#/components/schemas/LoginPlayerRequest"     
 *     parameters:
 *     responses:
 *       '200':
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/LoggedPlayerResponse"  
 *         description: A successful response
 *       '404':
 *         description: player   not found
 *       '500':
 *         description: Internal server error
 */
router.post("/login", validateData(loginPlayerSchema), loginPlayer);

/**
 * @swagger
 * /player/checkAdmin:
 *   post:
 *     summary: Check if the usage is an admin
 *     description: Check if the usage is an admin
 *     tags: [Player]
 *     parameters:
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
router.post("/checkAdmin", checkAdmin);

/**
 * @swagger
 * /player/find/teamless/list:
 *   get:
 *     summary: return the list of all the players without a team.
 *     description: Get the list of all the players without a team with only they ID and name.
 *     tags: [Player]
 *     responses:
 *       '200':
 *         description: Success
 *         schema:
 *          player:
 *              type: object
 *              properties:
 *                  id:
 *                     description: ID of the player
 *                     type: number
 *                     example: 1 
 *                  lastname:
 *                     description: the player lastname
 *                     type: string
 *                     minLenght: 1
 *                     example: Doe
 *       '500': 
 *         description: Internal server error
 */
router.get("/find/teamless/list", findTeamlessPlayers);

module.exports = router;


/**
* @swagger
* components:
*    schemas:
*        PlayerResponse:
*            type: object
*            properties:
*                id:
*                    type: number
*                    description: ID of the player
*                firstname:
*                    type: string
*                    description: player firstname
*                lastname:
*                    type: string
*                    description: player lastname
*            example:
*                id: 1
*                firstname: "Jane"
*                lastname: "Doe"
*       
*        LoggedPlayerResponse:
*            type: object
*            properties:
*                id:
*                    type: number
*                token:
*                    type: string
*                isAdmin:
*                    type: boolean
*                example:
*                    id: 1
*                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
*                    isAdmin: false
*        CreatePlayerRequest:
*            type: object
*            properties:
*                password:
*                    type: string
*                    description: ID of the player
*                    minLength: 12
*                firstname:
*                    type: string
*                    description: player firstname
*                lastname:
*                    type: string
*                    description: player lastname
*            example:
*                password: "myveryownpassword"
*                firstname: "Jane"
*                lastname: "Doe"
*        LoginPlayerRequest:
*            type: object
*            properties:
*                password:
*                    type: string
*                    description: ID of the player
*                    minLength: 12
*                lastname:
*                    type: string
*                    description: player lastname
*                example:
*                    password: "myveryownpassword"
*                    lastname: "Doe"
*   
*        UpdatePlayerRequest:
*            type: object
*            properties:
*                firstname:
*                    type: string
*                    description: player firstname
*                lastname:
*                    type: string
*                    description: player lastname
*                example:
*                    firstname: "Jane"
*                    lastname: "Doe"
*/
