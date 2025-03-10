import { Request, Response } from "express";
const express = require("express");
const router = express.Router();

router.get("", (req: Request,res: Response): Response =>{
    return res.send({data: "player"});
});

module.exports = router;