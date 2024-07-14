import express from 'express';
import Wallet from '../Models/walletModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

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

// Obtener la billetera del usuario
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const wallet = await Wallet.findOne({ userId }).lean();

        if (!wallet) {
            return res.status(404).send('Billetera no encontrada para este usuario');
        }

        res.json(wallet);
    } catch (error) {
        console.error('Error al obtener la billetera:', error);
        res.status(500).send('Error al obtener la billetera');
    }
});

// Cargar dinero a la billetera del usuario
router.put('/cargo', authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const { amount } = req.body;
        const wallet = await Wallet.findOne({ userId });

        if (!wallet) {
            return res.status(404).send('Billetera no encontrada para este usuario');
        }

        wallet.balance += amount;
        await wallet.save();
        res.send({ success: true });
    } catch (error) {
        console.error('Error al cargar dinero a la billetera:', error);
        res.status(500).send('Error al cargar dinero a la billetera');
    }
});

// Restar dinero de la billetera del usuario
router.put('/cobro', authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const { amount } = req.body; 
        const wallet = await Wallet.findOne({ userId });

        if (!wallet) {
            return res.status(404).send('Billetera no encontrada para este usuario');
        }

        if (wallet.balance < amount) {
            return res.status(400).send('Fondos insuficientes en la billetera');
        }

        wallet.balance -= amount;
        await wallet.save();
        res.send({ success: true });
    } catch (error) {
        console.error('Error al restar dinero de la billetera:', error);
        res.status(500).send('Error al restar dinero de la billetera');
    }
});

export default router;
