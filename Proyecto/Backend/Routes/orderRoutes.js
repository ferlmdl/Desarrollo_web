import express from 'express';
const router = express.Router();
import Order from '../Models/order.js';
import productoModel from "../Models/productModel.js";

// Obtener todas las órdenes
router.get('/a', async (req, res) => {
  try {
    const orders = await Order.find().populate('user products.product').lean();
    res.render('layouts/orders', { orders, layout: false });
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    res.status(500).send('Error al obtener órdenes');
  }
});

// Crear nueva orden
router.post('/', async (req, res) => {
  try {
    const { userId, products } = req.body;
    let total = 0;

    const productDetails = await Promise.all(products.map(async item => {
      const product = await productoModel.findById(item.productId);
      total += product.precio * item.quantity;
      return {
        product: product.id,
        quantity: item.quantity
      };
    }));

    const newOrder = new Order({
      user: userId,
      products: productDetails,
      total
    });

    await newOrder.save();
    res.redirect('/orders');
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).send('Error al crear la orden');
  }
});

export default router;
