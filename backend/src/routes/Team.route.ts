import { createTeam, deleteTeamById, filterTeamsByIds, getAllTeams, getAllTeamsIdAndName, getTeamById, getTeamByPlayerId, updateTeamById } from "../controller/Team.controller";
import { validateData } from "../middleware/DataValidation.middleware";
import { createTeamSchema } from "../request/team/CreateTeam.schema";
import { filterTeamByIdSchema } from "../request/team/FilterTeamById.schema";
import { updateTeamSchema } from "../request/team/UpdateTeam.schema";

const express = require("express");
const router = express.Router();

/**
* @swagger
* team/find/{teamId}:
*   get:
*       summary: Find a team by ID
*       description: Find a team by ID
*       tags: [Team]
*       parameters:
*           - in: path
*             name: teamId
*             schema:
*               type: number
*             required: true
*             description: Team ID
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.get("/find/:teamId(\\d+)", getTeamById);

/**
* @swagger
* team/find/{playerId}:
*   get:
*       summary: Find a team by a player ID
*       description: Find a team by a player ID
*       tags: [Team]
*       parameters:
*           - in: path
*             name: playerID
*             schema:
*               type: number
*             required: true
*             description: Player ID
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.get("/find/byPlayer/:playerId(\\d+)", getTeamByPlayerId);

/**
* @swagger
* team/filter/byIds/list:
*   post:
*       summary: Send teams with IDs not in the given list
*       description: Send teams with IDs not in the given list
*       tags: [Team]
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.post("/filter/byIds/list", validateData(filterTeamByIdSchema), filterTeamsByIds);

/**
* @swagger
* team/:
*   post:
*       summary: Create a team
*       description: Create a team
*       tags: [Team]
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.post("/", validateData(createTeamSchema), createTeam);

/**
* @swagger
* team/{teamId}:
*   post:
*       summary: Update a team
*       description: Update a team
*       tags: [Team]
*       parameters:
*           - in: path
*             name: teamId
*             schema:
*               type: number
*             required: true
*             description: Team ID
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.post("/:teamId(\\d+)", validateData(updateTeamSchema), updateTeamById);

/**
* @swagger
* team/all:
*   get:
*       summary: Get All the teams
*       description: Get All the teams
*       tags: [Team]
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.get("/all", getAllTeams);

/**
* @swagger
* team/list/all:
*   get:
*       summary: Get Team with only ID and names
*       description: Get Team with only ID and names
*       tags: [Team]
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.get("/list/all", getAllTeamsIdAndName);

/**
* @swagger
* team/{teamId}:
*   delete:
*       summary: Delete Team
*       description: Delete Team
*       tags: [Team]
*       parameters:
*           - in: path
*             name: teamId
*             schema:
*               type: number
*             required: true
*             description: Team ID
*       responses:
*           '200':
*               description: Success
*           '500':
*               description: Internal server error
*/
router.delete("/:teamId(\\d+)", deleteTeamById);

module.exports = router;