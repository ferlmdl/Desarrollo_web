import mongoose from "mongoose";

const reciboSchema = new mongoose.Schema({
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
    total: Number,
});

const reciboModel = mongoose.model("Recibo", reciboSchema);

export default reciboModel;
