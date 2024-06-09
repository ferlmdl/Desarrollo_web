import express from 'express';
const router = express.Router();
import Order from '../models/order.js';
import Product from '../models/product.js';

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render('layouts/products', { products, layout: false });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al obtener productos');
  }
});

// Crear nuevo producto
router.post('/', async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;

    const newProduct = new Product({
      nombre,
      precio,
      descripcion
    });

    await newProduct.save();
    res.redirect('/products');
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).send('Error al crear el producto');
  }
});

export default router;
