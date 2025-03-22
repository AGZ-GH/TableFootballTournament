import { validateData } from "../middleware/DataValidation.middleware";
import { loginPlayerSchema } from "../request/player/LoginPlayer.schema"
import { checkAdmin, createNewPlayer, deletePlayer, findTeamlessPlayers, getPlayer, loginPlayer, updatePlayer } from "../controller/Player.controller";
import { updatePlayerSchema } from "../request/player/UpdatePlayer.schema";
import { createPlayerSchema } from "../request/player/CreatePlayer.schema";

const express = require("express");
const router = express.Router();

router.get("/:playerId(\\d+)", getPlayer
    /*
        #swagger.summary = "Get player by ID."
        #swagger.description = "Get player by ID."
        #swagger.responses[200] = { description: 'A successful response' }
        #swagger.responses[404] = { description: 'Player not found' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
);

router.post("/create", validateData(createPlayerSchema), createNewPlayer
    /*
        #swagger.summary = "Create a player"
        #swagger.description = "Create a playe          r"

        #swagger.responses[201] = { description: 'Player created' }
        #swagger.responses[400] = { description: 'Player name already exist' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
);

router.post("/update/:playerId(\\d+)", validateData(updatePlayerSchema), updatePlayer
    /*
        #swagger.summary = "Update a player"
        #swagger.description = "update the player of the given ID"
        #swagger.responses[200] = {description: "A successful response"}   

        #swagger.responses[200] = { description: 'A successful response' }
        #swagger.responses[404] = { description: 'Player not found' }
        #swagger.responses[500] = { description: 'Internal server error' }
        
    */
);

router.delete("/:playerId(\\d+)", deletePlayer
    /*
        #swagger.summary = "Delete player by ID"
        #swagger.description = "Delete player by ID"

        #swagger.responses[200] = { description: 'A successful response' }
        #swagger.responses[404] = { description: 'Player not found' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
);

router.post("/login", validateData(loginPlayerSchema), loginPlayer
    /*
        #swagger.summary = "Log in a user"
        #swagger.description = "Log in users and return them their ID and token"
        #swagger.responses[200] = { description: 'A successful response' }
        #swagger.responses[404] = { description: 'Player not found' }
        #swagger.responses[500] = { description: 'Internal server error' }
        
    */
);

router.post("/checkAdmin", checkAdmin
    /*
        #swagger.summary = "Check if the usage is an admin"
        #swagger.description = "Check if the usage is an admin"
        #swagger.responses[201] = { description: 'A successful response' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
);

router.get("/find/teamless/list", findTeamlessPlayers
    /*
        #swagger.summary = "return the list of all the players without a team."
        #swagger.description = "Get the list of all the players without a team with only they ID and name.  "
        #swagger.responses[201] = { description: 'A successful response' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
);

module.exports = router;