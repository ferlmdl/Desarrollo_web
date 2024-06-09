import { Router } from "express";
import productoModel from "../models/producto.model.js";

const router = Router();

router.get("/", async (req, res) => {
    const productos = await productoModel.find().lean();
    res.render("administracion", { productos });
});

router.get("/crear", (req, res) => {
    res.render("crearProducto");
});

router.get("/:id", async (req, res) => {
    const producto = await productoModel.findById(req.params.id).lean();
    res.render("editarProducto", { producto });
});

export default router;
