import { Router } from 'express';
import { agregarProductoAlCarrito } from '../Controllers/carritoController.js';
import { isAuthenticated } from '../Middlewares/authJwt.js';
import carritoModel from '../Models/carritoModel.js';
import userModel from '../Models/userModel.js';

const router = Router();

router.post('/agregar/:productId', isAuthenticated, agregarProductoAlCarrito);

// Otras rutas del carrito
router.get("/comprar/:id", async (req, res) => {
    try {
        const carrito = await carritoModel.findById(req.params.id).populate("productos.id").lean();
        let precio = 0;
        carrito.productos.forEach(producto => {
            precio += producto.qty * producto.id.precio;
        });

        const user = await userModel.findById(carrito.user).lean();
        if (user.dinero < precio) {
            return res.send("No puedes comprar");
        }

        // Aquí puedes realizar la lógica de la compra
        res.send("Productos comprados");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al procesar la compra");
    }
});

router.post("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const carrito = await carritoModel.findById(req.params.id);
        const productExists = carrito.productos.some(producto => producto.id.toString() === productId);

        if (productExists) {
            const productIndex = carrito.productos.findIndex(producto => producto.id.toString() === productId);
            carrito.productos[productIndex].qty++;
        } else {
            carrito.productos.push({ id: productId, qty: 1 });
        }

        await carrito.save();
        res.send("Producto añadido");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al añadir el producto");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const carrito = await carritoModel.findById(req.params.id);
        const productIndex = carrito.productos.findIndex(producto => producto.id.toString() === productId);

        if (productIndex === -1) {
            return res.send("Producto no encontrado");
        }

        carrito.productos[productIndex].qty--;
        if (carrito.productos[productIndex].qty <= 0) {
            carrito.productos.splice(productIndex, 1);
        }

        await carrito.save();
        res.send("Producto disminuido");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al disminuir el producto");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const carrito = await carritoModel.findById(req.params.id).populate("productos.id").lean();
        res.send(carrito);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener el carrito");
    }
});

export default router;
