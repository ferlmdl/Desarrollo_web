import express from "express";
import { engine } from "express-handlebars";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import productosController from "./routes/productos.controller.js";
import catalogoController from "./routes/catalogo.controller.js";
import administracionController from "./routes/administracion.controller.js";
import carritoController from "./routes/carrito.controller.js";
import userController from "./routes/users.controller.js";
import recibosController from "./routes/recibos.controller.js";
import mainRoutes from "./routes/main.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

mongoose.set('strictQuery', true);
mongoose
  .connect("mongodb+srv://fernandavalencia:UCcf2M6M2KJ4KUed@cluster0.av5qpdc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to Mongo Database");
    initial();
  })
  .catch((error) => {
    console.error(`Connection refused: ${error}`);
  });

// Configuración de Handlebars
app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    defaultLayout: "index",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rutas estáticas
app.use(express.static("public"));

// Rutas de la API y del sitio web
app.use("/api/productos", productosController);
app.use("/api/carrito", carritoController);
app.use("/api/user", userController);
app.use("/api/recibos", recibosController);
app.use("/catalogo", catalogoController);
app.use("/administracion", administracionController);
app.use("/", mainRoutes);

// Iniciar el servidor
app.listen(3000, () => console.log("El servidor está listo en el puerto 3000"));
