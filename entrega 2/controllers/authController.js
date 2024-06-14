import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/user.js';
import config from "../config/authConfig.js";
import db from "../models/index.js";
const Role = db.role;


export const signup = async (req, res) => {
  try {
    const { nombre_completo, correo } = req.body;

    // Crear el nuevo usuario sin verificar la contraseña
    const newUser = new User({
      name: nombre_completo,
      correo: correo,
    });

    await newUser.save();
    res.send({ message: "¡Usuario registrado exitosamente!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { correo } = req.body;

    // Buscar al usuario por su correo para iniciar sesión
    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    // Iniciar sesión del usuario sin verificar la contraseña
    res.send({ message: "Inicio de sesión exitoso", user: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

