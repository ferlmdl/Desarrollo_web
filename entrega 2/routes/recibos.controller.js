import { Router } from "express";
import reciboModel from "../models/recibos.model.js";

const router = Router();

router.get("/", async (req, res) => {
    const recibos = await reciboModel.find().lean();
    res.send(recibos);
});

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const recibos = await reciboModel.find({ user: userId }).lean();
    res.send(recibos);
});

export default router;
