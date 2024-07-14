import mongoose from 'mongoose';
import User from './userModel.js'; 

mongoose.Promise = global.Promise;

const db = {
  mongoose,
  User
};

export default db;
