import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    dinero: Number,
    rol: String,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
