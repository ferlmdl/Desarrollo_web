import express from 'express';
import productoModel from '../Models/productoModel.js';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
} from '../Controllers/productController.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware para validar el JWT y verificar permisos de administrador
const authenticateAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        if (user.role !== 'admin') return res.sendStatus(403); 
        req.user = user;
        next();
    });
};

// Rutas para API
router.get('/api', getAllProducts);
router.get('/api/:id', getProductById);
router.post('/api', authenticateAdmin, createProduct);
router.put('/api/:id', authenticateAdmin, updateProductById);
router.delete('/api/:id', authenticateAdmin, deleteProductById);

// Rutas para renderizar
router.get('/productos', async (req, res) => {
    try {
        const products = await productoModel.find().lean();
        res.render('layouts/productos', { products });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
    }
});

router.post('/productos', async (req, res) => {
    try {
        const { name, precio, description, stock, imagenes } = req.body;
        const newProduct = new productoModel({ name, precio, description, stock, imagenes });
        await newProduct.save();
        res.redirect('/productos');
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).send('Error al crear el producto');
    }
});

router.get('/producto/:id', async (req, res) => {
    try {
        const producto = await productoModel.findById(req.params.id).lean();
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('layouts/producto', { producto, layout: false });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).send('Error al obtener el producto');
    }
});

export default router;
