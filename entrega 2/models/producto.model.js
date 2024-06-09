import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    name: String,
    precio: Number,
    stock: Number,
    imagen1: String,
    imagen2: String,
});

const productoModel = mongoose.model("Producto", productoSchema);

export default productoModel;
