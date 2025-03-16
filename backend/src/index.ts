import "reflect-metadata"
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import "express-async-errors"; 
import {errorHandler} from "./middleware/ErrorHandler.middleware"
dotenv.config();


const app: Express = express();

const port = process.env.PORT ?? 3000;

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

//error handler 
app.use(errorHandler);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});