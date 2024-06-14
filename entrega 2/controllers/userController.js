import jwt from "jsonwebtoken";
import User from '../models/user.model.js';

export const signup = async (req, res) => {
    try {
        const { nombre_completo, password, correo } = req.body;

        if (!nombre_completo || !password || !correo) {
            return res.status(400).send({ message: "Nombre completo, correo electrónico y contraseña son obligatorios" });
        }

        // Determinar si el usuario es administrador
        const isAdmin = (correo === 'admin@gmail.com');

        console.log(`isAdmin: ${isAdmin}`);  // Añade esta línea
        
        // Crear nuevo usuario
        const newUser = new User({
            name: nombre_completo,
            password,
            correo,
            isAdmin,
            isAuthenticated,
        });
        
        console.log(`Nuevo usuario antes de guardar: ${JSON.stringify(newUser)}`);  // Añade esta línea
        
        // Guardar nuevo usuario en la base de datos
        await newUser.save();

        res.status(201).send({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error("Error en signup:", error);
        res.status(500).send({ message: error.message });
    }
};
