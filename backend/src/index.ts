import "reflect-metadata"
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();


const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

const playerRoute = require("./routes/Player.route");
const teamRoute = require("./routes/Team.route");
const tournamentRoute = require("./routes/Tournament.route");

app.use("/player", playerRoute);
app.use("/team", teamRoute);
app.use("/tournament", tournamentRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});