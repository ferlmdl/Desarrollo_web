import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//import config from "../config/authConfig.js";
import db from "../models/index.js";
import User from '../models/user.model.js';
const Role = db.role;

// Función para registrar un nuevo usuario
// En controllers/userController.js

// Función para registrar un nuevo usuario
export const signup = async (req, res) => {
  try {
    const { nombre_completo, rut } = req.body;

    // Validar si los campos requeridos están presentes
    if (!nombre_completo || !rut) {
      return res.status(400).send({ message: "Nombre completo y RUT son obligatorios" });
    }

    // Verificar si el RUT ya está registrado
    const user = await User.findOne({ rut });
    if (user) {
      return res.status(400).send({ message: "El RUT ya está registrado" });
    }

    // Crear un nuevo usuario
    const newUser = new User({
      nombre_completo: nombre_completo,
      rut: rut,
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    res.status(201).send({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Función para iniciar sesión de usuario
export const signin = async (req, res) => {
  try {
    const { rut } = req.body;

    // Buscar al usuario por su RUT
    const user = await User.findOne({ rut });
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    // Aquí podrías establecer una sesión o simplemente devolver una confirmación
    res.status(200).send({ message: "Inicio de sesión exitoso", user: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


export default User;
