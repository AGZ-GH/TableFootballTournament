import { Request, Response } from "express";
import { TournamentService } from "../services/Tournament.service";

const express = require("express");
const router = express.Router();

const tournamentService = new TournamentService();

router.post("", (req: Request,res: Response): Response =>{
    return res.send({data: "player"});
});

router.get("/:tournamentId",(req: Request,res: Response): Response =>{
    const id = Number(req.params.productID);
    return res.send({data: tournamentService.getTournamentById(id).json});
});

router.delete("/:tournamentId", (req: Request,res: Response): Response =>{
    const id = Number(req.params.productID);
    return res.send({data: tournamentService.getTournamentById(id).json});
});

module.exports = router;