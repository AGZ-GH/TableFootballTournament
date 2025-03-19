import "reflect-metadata"
import express, { Express } from "express";
import dotenv from "dotenv";
import "express-async-errors";
import { errorHandler } from "./middleware/ErrorHandler.middleware"

dotenv.config();

const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TFT API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerUi = require('swagger-ui-express');

const app: Express = express();

const port = process.env.BACKEND_DOCKER_PORT ?? 3000;

app.use(express.json());

const cors = require('cors');
app.use(cors());


const playerRoute = require("./routes/Player.route");
const teamRoute = require("./routes/Team.route");
const tournamentRoute = require("./routes/Tournament.route");
const matchRoute = require("./routes/Match.route");

//routes
app.use("/player", playerRoute);
app.use("/team", teamRoute);
app.use("/tournament", tournamentRoute);
app.use("/match", matchRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

//error handler 
app.use(errorHandler);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});