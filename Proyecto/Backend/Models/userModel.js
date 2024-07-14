import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    dinero: Number,
    role: String,
    password: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isAuthenticated: {
        type: Boolean,
        default: true,
    }
});

const User = mongoose.model("User", userSchema);

export default User;
