import { Router } from "express";
import productModel from "../models/producto.model.js";

const router = Router();

router.get("/", async (req, res) => {
    const producto = await productModel.find().lean();
    res.send(producto);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const producto = await productModel.findById(id).lean();
    res.send(producto);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await productModel.findByIdAndDelete(id);
    res.send("Producto eliminado");
});

router.post("/:id", async (req, res) => {
    const { name, precio, stock } = req.body;

    const producto = await productModel.findById(req.params.id);
    producto.name = name;
    producto.precio = precio;
    producto.stock = stock;
    await producto.save();
    res.redirect("/administracion");
});

router.post("/", async (req, res) => {
    const { name, precio, stock } = req.body;

    const producto = new productModel({ name, precio, stock });
    await producto.save();
    res.redirect("/administracion");
});

export default router;
