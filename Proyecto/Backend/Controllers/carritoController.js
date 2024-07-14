import Carrito from '../Models/carritoModel.js';
import Producto from '../Models/productoModel.js';

export const agregarProductoAlCarrito = async (req, res) => {
    if (!req.session.isAuthenticated) {
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
    }

    const productId = req.params.productId;
    const userId = req.session.user._id;

    try {
        let carrito = await Carrito.findOne({ user: userId });

        if (!carrito) {
            carrito = new Carrito({ user: userId, productos: [] });
        }

        const productoExistente = carrito.productos.find(p => p.id.toString() === productId);

        if (productoExistente) {
            productoExistente.qty += 1;
        } else {
            const producto = await Producto.findById(productId);
            if (!producto) {
                return res.status(404).json({ success: false, message: 'Producto no encontrado' });
            }
            carrito.productos.push({ id: producto._id, qty: 1 });
        }

        await carrito.save();

        const productosCount = carrito.productos.reduce((acc, item) => acc + item.qty, 0);

        res.json({
            success: true,
            message: 'Producto agregado al carrito',
            productosCount: productosCount
        });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({
            success: false,
            message: 'Error al agregar producto al carrito'
        });
    }
};
