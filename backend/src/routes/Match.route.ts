import { createMatch, deleteMatch, findAllMatches, findTournamentMatches, getMatchById, updateMatch } from "../controller/Match.controller";
import { validateData } from "../middleware/DataValidation.middleware";
import { updateMatchSchema } from "../request/match/UpdateMatch.schema";
import { createMatchSchema } from "../request/match/CreateMatch.schema";

const express = require("express");
const router = express.Router();

/**
* @swagger
* match/find/{id}:
*   get:
*       summary: Get a match by its ID
*       description: Get a match by its ID
*       tags: [Match]
*       parameters:
*           - in: path
*             name: matchId
*             schema:
*               type: number
*             required: true
*             description: Match ID     
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.get("/find/:matchId(\\d+)", getMatchById);

/**
* @swagger
* match/last/all:
*   get:
*       summary: Get all the matches
*       description: Get all the matches
*       tags: [Match]
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.get("/list/all", findAllMatches);

/**
* @swagger
* match/find/byTournament/{tournamentId}:
*   get:
*       summary: Find matches by a tournament ID
*       description: Find matches by a tournament ID
*       tags: [Match]
*       parameters:
*           - in: path
*             name: tournamentId
*             schema:
*               type: number
*             required: true
*             description: Tournament ID
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.get("/find/byTournament/:tournamentId(\\d+)", findTournamentMatches);

/**
* @swagger
* match/create:
*   post:
*       summary: Create a tournament
*       description: Create a tournament
*       tags: [Match]
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.post("/create", validateData(createMatchSchema), createMatch);

/**
* @swagger
* match/update/{matchId}:
*   post:
*       summary: Update a tournament
*       description: Update a tournament
*       tags: [Match]
*       parameters:
*           - in: path
*             name: matchId
*             schema:
*               type: number
*             required: true
*             description: Match ID
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.post("/update/:matchId(\\d+)", validateData(updateMatchSchema), updateMatch);

/**
* @swagger
* match/delete/{matchId}:
*   delete:
*       summary: Delete a tournament
*       description: Delete a tournament
*       tags: [Match]
*       parameters:
*           - in: path
*             name: matchId
*             schema:
*               type: number
*             required: true
*             description: Match ID
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.delete("/delete/:matchId(\\d+)", deleteMatch);

module.exports = router;