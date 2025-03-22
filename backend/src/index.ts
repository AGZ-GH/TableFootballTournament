import "reflect-metadata"
import express, { Express } from "express";
import dotenv from "dotenv";
import "express-async-errors";
import { errorHandler } from "./middleware/ErrorHandler.middleware"

dotenv.config();

require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../src/swagger-output.json')

const app: Express = express();

const port = process.env.BACKEND_DOCKER_PORT ?? 3000;

app.use(express.json());

//cors
const cors = require('cors');
app.use(cors());

// routes imports
const playerRoute = require("./routes/Player.route");
const teamRoute = require("./routes/Team.route");
const tournamentRoute = require("./routes/Tournament.route");
const matchRoute = require("./routes/Match.route");

//routes
app.use("/player", playerRoute
  /* 
  #swagger.tags = ['Player']
  */
);
app.use("/team", teamRoute
  /* 
    #swagger.tags = ['Team']
    */
);
app.use("/tournament", tournamentRoute
  /* 
  #swagger.tags = ['Tournament']
  */
);
app.use("/match", matchRoute
  /* 
  #swagger.tags = ['match']
  */
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//error handler 
app.use(errorHandler);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});