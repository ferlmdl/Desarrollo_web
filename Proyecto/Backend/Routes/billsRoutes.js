import { Router } from "express";
import reciboModel from "../Models/billsModel.js";

const router = Router();

// Obtener recibos del usuario autenticado
router.get("/", async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).send('No autenticado');
        }

        const userId = req.session.user._id;
        const recibos = await reciboModel.find({ user: userId }).lean();
        
        res.render('recibos', { recibos });
    } catch (error) {
        console.error('Error al obtener recibos del usuario:', error);
        res.status(500).send('Error al obtener recibos del usuario');
    }
});

// Obtener el detalle de una compra por ID
router.get("/:userId/:id", async (req, res) => {
    try {
        const { userId, id } = req.params;
        const recibo = await reciboModel.findOne({ user: userId, _id: id }).lean();
        if (!recibo) {
            return res.status(404).send('Recibo no encontrado');
        }
        res.send(recibo);
    } catch (error) {
        console.error('Error al obtener el detalle del recibo:', error);
        res.status(500).send('Error al obtener el detalle del recibo');
    }
});

export default router;
