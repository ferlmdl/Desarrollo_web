import { Router } from "express";
import carritoModel from "../models/carrito.model.js";
import userModel from "../models/user.model.js"; 

const router = Router();

const userId = "664f53dfc22b5af5e8a66279";
const carritoId = "664f53f2c22b5af5e8a6627a";

router.get("/comprar/:id", async (req, res) => {
    const carrito = await carritoModel.findById(req.params.id).populate("productos.id").lean();

    let precio = 0;
    carrito.productos.forEach(producto => {
        precio += producto.qty * producto.id.precio;
    });

    const user = await userModel.findById(userId).lean();

    if (user.dinero < precio) {
        res.send("No puedes comprar");
        return;
    }
    res.send("Productos comprados");
});

router.post("/:id", async (req, res) => {
    const productId = req.params.id;

    const carrito = await carritoModel.findById(carritoId);
    const productExists = carrito.productos.some(producto => producto.id.toString() === productId);

    if (productExists) {
        const productIndex = carrito.productos.findIndex(producto => producto.id.toString() === productId);
        carrito.productos[productIndex].qty++;
    } else {
        carrito.productos.push({ id: productId, qty: 1 });
    }

    await carrito.save();
    res.send("Producto añadido");
});

router.put("/:id", async (req, res) => {
    const productId = req.params.id;
    const carrito = await carritoModel.findById(carritoId);

    const productIndex = carrito.productos.findIndex(producto => producto.id.toString() === productId);

    if (productIndex === -1) {
        res.send("Producto no encontrado");
        return;
    }

    carrito.productos[productIndex].qty--;
    if (carrito.productos[productIndex].qty <= 0) {
        carrito.productos.splice(productIndex, 1);
    }

    await carrito.save();
    res.send("Producto disminuido");
});

router.get("/:id", async (req, res) => {
    const carrito = await carritoModel.findById(req.params.id).populate("productos.id").lean();
    res.send(carrito);
});

export default router;
