import express from 'express';
import User from '../controllers/userController.js';
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

//rutas post 

router.post('/registro', async (req, res) => {
    const { nombre_completo, rut, contrasena } = req.body;
  
    try {
      // Crear el nuevo usuario
      const newUser = new User({
        nombre_completo: nombre_completo,
        rut: rut,
        contrasena: contrasena, 
      });
  
      await newUser.save();
  
      res.redirect('/ingresar');
    } catch (error) {
      console.error(error);
      res.status(500).send('Hubo un error al crear el usuario');
    }
  });
  
  router.post('/ingresar', async (req, res) => {
    const { rut, contrasena } = req.body;
  
    try {
      const user = await User.findOne({ rut: rut });
  
      if (!user) {
        return res.status(400).send('El RUT ingresado no está registrado');
      }
  
      req.session.userId = user._id;
      req.session.userRut = user.rut;
  
      res.redirect('/principal');
    } catch (error) {
      console.error(error);
      res.status(500).send('Hubo un error al iniciar sesión');
    }
  });
  
  
  


export default router;