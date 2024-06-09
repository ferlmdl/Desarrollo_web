import mongoose from 'mongoose';
import User from './user.model.js'; // Asegúrate de que el nombre del archivo sea correcto

mongoose.Promise = global.Promise;

const db = {
  mongoose,
  User
};

export default db;
