import { Router } from "express";
import Order from "../Models/orderModel.js";
import Wallet from "../Models/walletModel.js";
import jwt from 'jsonwebtoken';

const router = Router();

// Middleware para validar el JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Realizar una compra
router.post("/buy", authenticateToken, async (req, res) => {
    try {
        const { products } = req.body;

        const user_id = req.user._id;
        const wallet = await Wallet.findOne({ user_id });

        if (!wallet) {
            return res.status(404).send('Billetera no encontrada para este usuario');
        }

        let totalCost = 0;
        for (const product of products) {
            totalCost += product.precio * product.qty;
        }

        if (wallet.amount < totalCost) {
            return res.status(400).send('Fondos insuficientes');
        }

        wallet.amount -= totalCost;
        await wallet.save();

        const newOrder = new Order({ user: user_id, products, total: totalCost });
        await newOrder.save();

        res.send({ success: true });
    } catch (error) {
        console.error('Error al realizar la compra:', error);
        res.status(500).send('Error al realizar la compra');
    }
});

export default router;
