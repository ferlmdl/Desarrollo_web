import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    productos: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Producto",
            },
            qty: Number,
        },
    ],
});

const carritoModel = mongoose.model("Carrito", carritoSchema);

export default carritoModel;
