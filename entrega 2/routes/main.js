import express from 'express';
import { signup } from '../controllers/userController.js';
import User from '../models/user.model.js';  // Asegúrate de importar el modelo de usuario

const router = express.Router();

router.get('/', (req, res) => {
    res.render('layouts/principal', { layout: false });
});

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

router.get('/principal', (req, res) => {
    res.render('layouts/principal', { layout: false });
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

router.get('/wallet', (req, res) => {
    res.render('layouts/wallet', { layout: false });
});

router.get('/body', (req, res) => {
    res.render('layouts/body_index', { layout: false });
});

// Rutas POST 

// Rutas POST 

router.post('/registro', async (req, res) => {
  const { nombre_completo, correo, password } = req.body;

  if (!nombre_completo || !correo || !password) {
      return res.status(400).send('Todos los campos son obligatorios');
  }

  try {
      // Crear el nuevo usuario
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
      res.locals.isAuthenticated = req.session.isAuthenticated;

      res.redirect('/principal');
  } catch (error) {
      console.error(error);
      res.status(500).send('Hubo un error al iniciar sesión');
    }
});

export default router;
