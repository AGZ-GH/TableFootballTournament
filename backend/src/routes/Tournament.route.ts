import { validateData } from "../middleware/DataValidation.middleware";
import { addTeamToTournament, createTournament, deleteTournamentById, generateTournament, getAllTournaments, getTournamentById, getTournamentWithMatchesById } from "../controller/Tournament.controller";
import { addTeamToTournamentSchema } from "../request/tournament/AddTeamToTournament.schema";
import { createTournamentSchema } from "../request/tournament/CreateTournament.schema";

const express = require("express");
const router = express.Router();

/**
* @swagger
* tournament/create:
*    post:
*        summary: Create a tournament
*        description: Create a tournament
*        tags: [Tournament]
*        responses:
*            '200':
*                description: Success
*            '500':
*                description: Internal server error
 */
router.post("/create", validateData(createTournamentSchema), createTournament);

/**
* @swagger
* tournament/generate/{tournamentId}:
*    post:
*        summary: Generate a tournament
*        description: Generate a tournament by setting up all of the matches
*        tags: [Tournament]
*        parameters:
*           - in: path
*             name: tournamentID
*             schema:
*               type: number
*             required: true
*             description: Tournament ID
*        responses:
*            '200':
*                description: Success
*            '500':
*                description: Internal server error
 */
router.post("/generate/:tournamentId",generateTournament);

/**
* @swagger
* tournament/addTeam:
*    post:
*        summary: Add a team to the tournament
*        description: Add a team to the tournament
*        tags: [Tournament]
*        responses:
*            '200':
*                description: Success
*            '500':
*                description: Internal server error
 */
router.post("/addTeam", validateData(addTeamToTournamentSchema), addTeamToTournament);

/**
* @swagger
* tournament/find/{tournamentId}:
*    get:
*        summary: Get tournament by ID
*        description: Get tournament by ID
*        tags: [Tournament]
*        parameters:
*           - in: path
*             name: tournamentID
*             schema:
*               type: number
*             required: true
*             description: Tournament ID
*        responses:
*            '200':
*                description: Success
*            '500':
*                description: Internal server error
 */
router.get("/find/:tournamentId(\\d+)",getTournamentById);

/**
* @swagger
* tournament/all:
*    get:
*        summary: Get all the tournaments
*        description: Get all the tournaments
*        tags: [Tournament]
*        parameters:
*           - in: path
*             name: tournamentID
*             schema:
*               type: number
*             required: true
*             description: Tournament ID
*        responses:
*            '200':
*                description: Success
*            '500':
*                description: Internal server error
 */
router.get("/all", getAllTournaments);

/**
* @swagger
* tournament/find/withMatches/{tournamentId}:
*    get:
*        summary: Get tournament by ID with its matches
*        description: Get tournament by ID with its matches
*        tags: [Tournament]
*        parameters:
*           - in: path
*             name: tournamentID
*             schema:
*               type: number
*             required: true
*             description: Tournament ID
*        responses:
*            '200':
*                description: Success
*            '500':
*                description: Internal server error
 */
router.get("/find/withMatches/:tournamentId(\\d+)", getTournamentWithMatchesById);

/**
* @swagger
* tournament/find/withMatches/{tournamentId}:
*    delete:
*        summary: Delete tournament by ID with its matches
*        description: Delete tournament by ID with its matches
*        tags: [Tournament]
*        parameters:
*           - in: path
*             name: tournamentID
*             schema:
*               type: number
*             required: true
*             description: Tournament ID
*        responses:
*            '200':
*                description: Success
*            '500':
*                description: Internal server error
 */
router.delete("/:tournamentId(\\d+)", deleteTournamentById);

module.exports = router;