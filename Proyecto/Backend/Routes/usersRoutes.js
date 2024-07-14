import { Router } from "express";
import userModel from "../Models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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

// Obtener todos los usuarios (Solo para administradores)
router.get("/", authenticateToken, async (req, res) => {
    try {
        const users = await userModel.find().lean();
        res.send(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error al obtener usuarios');
    }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
    try {
        const { name, lastName, email, password, address, birthday } = req.body;

        // Verificar si el email ya existe
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send('El email ya está registrado');
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ name, lastName, email, password: hashedPassword, address, birthday });
        await newUser.save();
        res.send({ success: true });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).send('Error al crear el usuario');
    }
});

// Autenticar un usuario y devolver un JWT
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Credenciales incorrectas');
        }

        // Generar y devolver un JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.send({ success: true, token });
    } catch (error) {
        console.error('Error al autenticar el usuario:', error);
        res.status(500).send('Error al autenticar el usuario');
    }
});

export default router;
