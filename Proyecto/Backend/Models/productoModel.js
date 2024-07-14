import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    name: String,
    precio: Number,
    stock: Number,
    description: String,
    imagenes: [String]
});

const productoModel = mongoose.model("Producto", productoSchema);

export default productoModel;
