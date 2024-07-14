import express from 'express';
import User from '../Models/userModel.js';
import Wallet from '../Models/walletModel.js';
import productoModel from '../Models/productoModel.js';

const router = express.Router();

// Rutas GET

router.get('/administracion', (req, res) => {
    res.render('layouts/administracion', { layout: false });
});

router.get('/ingresar', (req, res) => {
    res.render('layouts/ingresar', { layout: false });
});

router.get('/carrito', (req, res) => {
    res.render('layouts/carrito', { layout: false });
});

router.get('/catalogo', (req, res) => {
    res.render('layouts/catalogo', { layout: false });
});

router.get('/crearProducto', (req, res) => {
    res.render('layouts/crearProducto', { layout: false });
});

router.get('/editarProducto', (req, res) => {
    res.render('layouts/editarProducto', { layout: false });
});

router.get('/registro', (req, res) => {
    res.render('layouts/registro', { layout: false });
});

router.get('/pagos', (req, res) => {
    res.render('layouts/pagos', { layout: false });
});

router.get('/', async (req, res) => {
    try {
        const productos = await productoModel.find().lean();
        const isAdmin = req.session.isAdmin || false;
        const isAuthenticated = req.session.isAuthenticated || false;
        res.render('layouts/principal', { productos, isAuthenticated, isAdmin, layout: false });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
});

router.get('/producto', (req, res) => {
    res.render('layouts/producto', { layout: false });
});

router.get('/recibos', (req, res) => {
    res.render('layouts/recibos', { layout: false });
});

router.get('/registrado', (req, res) => {
    res.render('layouts/registrado', { layout: false });
});

// Ruta de cierre de sesión
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/');
    });
});

// Rutas POST
router.post('/registro', async (req, res) => {
    const { nombre_completo, correo, password } = req.body;

    if (!nombre_completo || !correo || !password) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const newUser = new User({
            name: nombre_completo,
            correo: correo,
            password: password,
        });

        if (correo === 'admin@gmail.com') {
            newUser.isAdmin = true;
        }

        await newUser.save();
        newUser.isAuthenticated = true;

        const newWallet = new Wallet({
            userId: newUser._id,
        });

        await newWallet.save();

        res.redirect('/ingresar');
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al crear el usuario');
    }
});

router.post('/ingresar', async (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        const user = await User.findOne({ correo: correo });

        if (!user) {
            return res.status(400).send('El correo ingresado no está registrado');
        }

        if (user.password !== password) {
            return res.status(400).send('La contraseña es incorrecta');
        }

        req.session.userId = user._id;
        req.session.userCorreo = user.correo;
        req.session.isAdmin = user.isAdmin;
        req.session.isAuthenticated = true;
        res.locals.isAuthenticated = req.session.isAuthenticated;
        res.locals.isAdmin = req.session.isAdmin;

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al iniciar sesión');
    }
});


// Ruta para obtener la billetera del usuario
router.get('/wallet', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).send('Usuario no autenticado');
        }

        const user_id = req.session.userId;
        const wallet = await Wallet.findOne({ user_id }).lean();

        if (!wallet) {
            return res.status(404).send('Billetera no encontrada para este usuario');
        }

        res.json(wallet);
    } catch (error) {
        console.error('Error al obtener la billetera:', error);
        res.status(500).send('Error al obtener la billetera');
    }
});

export default router;