import "reflect-metadata"
import { DataSource } from "typeorm"
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();



const app: Express = express();
const port = process.env.PORT ?? 3000;

async function connectDatabase() {
  try {
       
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

connectDatabase();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});