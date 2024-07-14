import express from "express";
import { engine } from "express-handlebars";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import dotenv from 'dotenv';
import main from "./Routes/main.js";
import productRoutes from './Routes/productRoutes.js';
import catalogoRoutes from './Routes/catalogoRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import carritoRoutes from './Routes/carritoRoutes.js';
import usersRoutes from './Routes/usersRoutes.js';
import billsRoutes from './Routes/billsRoutes.js';
import walletRoutes from './Routes/walletRoutes.js';
import comprasRoutes from './Routes/comprasRoutes.js';

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuración de Handlebars
app.set('views', path.join(__dirname, '../Frontend/views'));
app.set("view engine", "html");
app.engine(
  "html",
  engine({
    extname: ".html",
    layoutsDir: path.join(__dirname, '../Frontend/views/layouts'),
    partialsDir: path.join(__dirname, '../Frontend/views/partials'),
    defaultLayout: "principal",
    helpers: {
      json: function(context) {
        return JSON.stringify(context);
      }
    }
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
 
// Configuración de sesión
app.use(session({
  secret: 'MySecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use((req, res, next) => {
  res.locals.isAdmin = req.session.isAdmin;
  res.locals.isAuthenticated = req.session.isAuthenticated;
  next();
});

// Rutas
app.use("/", main);
app.use('/carrito', carritoRoutes);
app.use("/", productRoutes);
app.use("/catalogo", catalogoRoutes);
app.use("/administracion", adminRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/recibos", billsRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/compras", comprasRoutes);

export default app;
