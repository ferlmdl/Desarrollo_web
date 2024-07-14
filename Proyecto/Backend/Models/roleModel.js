import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  name: String,
});

const role = mongoose.model('Rol', RoleSchema);

export default role;
