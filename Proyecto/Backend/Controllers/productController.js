import productModel from '../Models/productoModel.js';

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const productos = await productoModel.find().lean();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
    }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const producto = await productModel.findById(id).lean();
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        res.json(producto);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).send('Error al obtener el producto');
    }
};

// Crear nuevo producto
export const createProduct = async (req, res) => {
    try {
        const { name, precio, stock, description, imagenes } = req.body;
        const newProduct = new productoModel({ name, precio, stock, description, imagenes });
        await newProduct.save();
        res.status(201).send({ success: true });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).send('Error al crear el producto');
    }
};

// Actualizar un producto por ID
export const updateProductById = async (req, res) => {
    try {
        const { name, precio, stock, description, imagenes } = req.body;
        const producto = await productoModel.findById(req.params.id);
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        producto.name = name;
        producto.precio = precio;
        producto.stock = stock;
        producto.description = description;
        producto.imagenes = imagenes;
        
        await producto.save();
        res.send({ success: true });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send('Error al actualizar el producto');
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        await productoModel.findByIdAndDelete(id);
        res.send({ success: true, message: 'Producto eliminado' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send('Error al eliminar el producto');
    }
};
