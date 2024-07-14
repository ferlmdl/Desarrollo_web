import { Router } from "express";
import productoModel from "../Models/productoModel.js";
import carritoModel from "../Models/carritoModel.js";


const router = Router();

const carritoId = "664f53f2c22b5af5e8a6627a";

router.get("/carrito", async (req, res) => {
    const carrito = await carritoModel.findById(carritoId).populate("productos.id").lean();
    res.render("carrito", { productos: carrito.productos });
});

router.get("/", async (req, res) => {
    const productos = await productoModel.find().lean();
    res.render("catalogo", { productos });
});

router.get("/:id", async (req, res) => {
    const producto = await productoModel.findById(req.params.id).lean();
    res.render("producto", { producto });
});

export default router;
